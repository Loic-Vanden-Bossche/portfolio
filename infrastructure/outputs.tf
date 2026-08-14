output "public_url" {
  description = "Public HTTPS URL of the portfolio"
  value       = module.domain.public_url
}

output "namespace" {
  description = "Kubernetes namespace containing the portfolio resources"
  value       = kubernetes_namespace_v1.portfolio.metadata[0].name
}

output "application_internal_url" {
  description = "Internal Kubernetes URL of the portfolio service"
  value       = module.app.internal_url
}

output "database_service" {
  description = "Internal Kubernetes DNS name of PostgreSQL"
  value       = module.database.service_dns
}
