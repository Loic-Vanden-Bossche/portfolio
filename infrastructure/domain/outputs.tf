output "public_url" {
  description = "Public HTTPS URL of the portfolio"
  value       = "https://${var.hostname}"
}

output "tls_secret_name" {
  description = "Name of the Kubernetes Secret containing the public TLS certificate"
  value       = "portfolio-tls"
}
