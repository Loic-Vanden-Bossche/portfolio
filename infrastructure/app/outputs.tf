output "service_name" {
  description = "Name of the portfolio Kubernetes Service"
  value       = kubernetes_service_v1.application.metadata[0].name
}

output "service_port_name" {
  description = "Name of the HTTP port exposed by the portfolio Kubernetes Service"
  value       = "http"
}

output "internal_url" {
  description = "Internal Kubernetes URL of the portfolio service"
  value       = "http://${kubernetes_service_v1.application.metadata[0].name}.${var.namespace}.svc.cluster.local:3000"
}
