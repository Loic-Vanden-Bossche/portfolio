# Portfolio infrastructure

This standalone Terraform root deploys the portfolio and PostgreSQL to the existing CHBRX Kubernetes platform. It consumes the platform's NGINX ingress controller, `letsencrypt-production` ClusterIssuer, and default StorageClass without managing those shared resources.

The Terraform state uses the existing Scaleway Object Storage bucket with the dedicated key `portfolio.tfstate`. Backend credentials are intentionally not stored in Terraform files.

## Module architecture

The root module owns only the backend, provider configuration, namespace, shared inputs, module composition, and public outputs. Workload resources are grouped by responsibility:

- `database/`: PostgreSQL Secret, persistent volume claim, Deployment, and Service.
- `app/`: optional GHCR Secret, Prisma migration Job, application Deployment, and Service.
- `domain/`: public NGINX Ingress and cert-manager TLS configuration for `lvdb.chbrx.com`.

Module outputs form the dependency chain: the application receives the database Secret name, and the domain receives the application Service name and port.

## Prerequisites

- Terraform 1.15.8 or newer.
- A working kubeconfig for the CHBRX cluster.
- Scaleway Object Storage credentials exported as `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY`.
- A production image pushed with an immutable version tag or digest and configured as `application_image`.
- DNS for `lvdb.chbrx.com` pointing to the existing NGINX ingress endpoint.

If the GHCR package is private, provide the optional sensitive `ghcr_credentials` object. Both GHCR credentials and the database password are stored in Terraform state because Terraform manages the corresponding Kubernetes Secrets; protect access to the Scaleway state accordingly.

## Manual deployment

For the complete local deployment flow, authenticate Docker with GHCR, configure the Terraform prerequisites below, and run from `app/` with an immutable version:

```powershell
docker login ghcr.io
yarn deploy v1.0.0
```

This builds `app/Dockerfile`, pushes both `ghcr.io/loic-vanden-bossche/portfolio:<version>` and `ghcr.io/loic-vanden-bossche/portfolio:latest`, initializes Terraform, and automatically applies using only the immutable versioned image reference. The image's OCI source label links the GHCR package to the `Loic-Vanden-Bossche/portfolio` GitHub repository. Set `GHCR_IMAGE` to override the default repository. The scripted deployment uses Terraform's `-auto-approve`; the manual commands below retain their normal review flow.

Alternatively, run each Terraform step manually. Copy `terraform.tfvars.example` to the ignored `terraform.tfvars`, replace the placeholders, and then review a plan before applying it:

```powershell
$env:AWS_ACCESS_KEY_ID = "replace-with-scaleway-access-key"
$env:AWS_SECRET_ACCESS_KEY = "replace-with-scaleway-secret-key"

terraform -chdir=infrastructure init
terraform -chdir=infrastructure fmt -check -diff -recursive
terraform -chdir=infrastructure validate -no-color
terraform -chdir=infrastructure plan -no-color -input=false -out=portfolio.tfplan
terraform -chdir=infrastructure apply portfolio.tfplan
```

The deployment runs `yarn db:deploy` as a Kubernetes Job before rolling out the application. The PostgreSQL claim does not wait for binding during resource creation because the cluster's default StorageClass uses `WaitForFirstConsumer`; the database Deployment supplies that consumer. The claim retains `prevent_destroy` to protect database data during future changes.

No CI/CD resources or workflows are included.
