variable "namespace" {
  description = "Kubernetes namespace in which to deploy the application"
  type        = string
}

variable "image" {
  description = "Pinned OCI image containing the production portfolio application"
  type        = string
}

variable "image_pull_policy" {
  description = "Kubernetes image pull policy"
  type        = string
}

variable "ghcr_credentials" {
  description = "Optional GHCR credentials; null when the image is public"
  type = object({
    username = string
    token    = string
  })
  nullable  = true
  sensitive = true
}

variable "replicas" {
  description = "Number of application replicas"
  type        = number
}

variable "database_secret_name" {
  description = "Kubernetes Secret containing the DATABASE_URL value"
  type        = string
}
