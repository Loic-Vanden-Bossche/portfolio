variable "namespace" {
  description = "Kubernetes namespace in which to deploy PostgreSQL"
  type        = string
}

variable "password" {
  description = "Password for the portfolio PostgreSQL role"
  type        = string
  sensitive   = true
}

variable "image" {
  description = "PostgreSQL container image"
  type        = string
}

variable "storage_size" {
  description = "Persistent storage requested for PostgreSQL"
  type        = string
}
