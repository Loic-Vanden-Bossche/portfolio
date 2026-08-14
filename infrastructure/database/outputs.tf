output "secret_name" {
  description = "Name of the Kubernetes Secret containing the database connection details"
  value       = kubernetes_secret_v1.database.metadata[0].name
}

output "service_name" {
  description = "Name of the PostgreSQL Kubernetes Service"
  value       = kubernetes_service_v1.database.metadata[0].name
}

output "service_dns" {
  description = "Internal Kubernetes DNS name of PostgreSQL"
  value       = "${kubernetes_service_v1.database.metadata[0].name}.${var.namespace}.svc.cluster.local"
}
