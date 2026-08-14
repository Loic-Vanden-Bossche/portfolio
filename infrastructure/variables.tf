variable "kubeconfig_path" {
  description = "Path to the kubeconfig file used to access the CHBRX Kubernetes cluster"
  type        = string
  default     = "~/.kube/config"
}

variable "namespace_name" {
  description = "Kubernetes namespace dedicated to the portfolio"
  type        = string
  default     = "portfolio"

  validation {
    condition     = can(regex("^[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?$", var.namespace_name))
    error_message = "The namespace must be a valid lowercase Kubernetes DNS label."
  }
}

variable "hostname" {
  description = "Public hostname used to expose the portfolio"
  type        = string
  default     = "lvdb.chbrx.com"

  validation {
    condition     = can(regex("^[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\\.[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?)+$", var.hostname))
    error_message = "The hostname must be a valid lowercase DNS hostname."
  }
}

variable "application_image" {
  description = "Pinned OCI image containing the production portfolio application"
  type        = string

  validation {
    condition     = !endswith(var.application_image, ":latest")
    error_message = "Use an immutable version tag or digest instead of the mutable latest tag."
  }
}

variable "image_pull_policy" {
  description = "Kubernetes image pull policy used by the application and migration job"
  type        = string
  default     = "IfNotPresent"

  validation {
    condition     = contains(["Always", "IfNotPresent", "Never"], var.image_pull_policy)
    error_message = "The image pull policy must be Always, IfNotPresent, or Never."
  }
}

variable "ghcr_credentials" {
  description = "Optional GHCR credentials; leave null when the application image is public"
  type = object({
    username = string
    token    = string
  })
  default   = null
  nullable  = true
  sensitive = true
}

variable "replicas" {
  description = "Number of portfolio application replicas"
  type        = number
  default     = 1

  validation {
    condition     = var.replicas >= 1
    error_message = "At least one application replica is required."
  }
}

variable "nginx_ingress_class" {
  description = "Ingress class provided by the CHBRX NGINX ingress controller"
  type        = string
  default     = "nginx"
}

variable "certificate_issuer_name" {
  description = "cert-manager ClusterIssuer used for the public TLS certificate"
  type        = string
  default     = "letsencrypt-production"
}

variable "database_password" {
  description = "Password for the portfolio PostgreSQL role"
  type        = string
  sensitive   = true

  validation {
    condition     = length(var.database_password) >= 16 && can(regex("^[A-Za-z0-9]+$", var.database_password))
    error_message = "The database password must contain at least 16 alphanumeric characters."
  }
}

variable "database_image" {
  description = "PostgreSQL image aligned with the canonical local compose environment"
  type        = string
  default     = "postgres:17-alpine"
}

variable "database_storage_size" {
  description = "Persistent storage requested for PostgreSQL"
  type        = string
  default     = "5Gi"
}
