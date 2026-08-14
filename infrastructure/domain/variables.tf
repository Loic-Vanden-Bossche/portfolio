variable "namespace" {
  description = "Kubernetes namespace containing the application"
  type        = string
}

variable "hostname" {
  description = "Public hostname used to expose the application"
  type        = string
}

variable "ingress_class_name" {
  description = "Kubernetes ingress class name"
  type        = string
}

variable "certificate_issuer_name" {
  description = "cert-manager ClusterIssuer used for TLS"
  type        = string
}

variable "service_name" {
  description = "Name of the application Kubernetes Service"
  type        = string
}

variable "service_port_name" {
  description = "Name of the port exposed by the application Kubernetes Service"
  type        = string
}
