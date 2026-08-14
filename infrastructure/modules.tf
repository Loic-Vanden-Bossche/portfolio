module "database" {
  source = "./database"

  namespace    = kubernetes_namespace_v1.portfolio.metadata[0].name
  password     = var.database_password
  image        = var.database_image
  storage_size = var.database_storage_size
}

module "app" {
  source = "./app"

  depends_on = [module.database]

  namespace            = kubernetes_namespace_v1.portfolio.metadata[0].name
  image                = var.application_image
  image_pull_policy    = var.image_pull_policy
  ghcr_credentials     = var.ghcr_credentials
  replicas             = var.replicas
  database_secret_name = module.database.secret_name
}

module "domain" {
  source = "./domain"

  namespace               = kubernetes_namespace_v1.portfolio.metadata[0].name
  hostname                = var.hostname
  ingress_class_name      = var.nginx_ingress_class
  certificate_issuer_name = var.certificate_issuer_name
  service_name            = module.app.service_name
  service_port_name       = module.app.service_port_name
}
