locals {
  labels = {
    "app.kubernetes.io/name"      = "portfolio"
    "app.kubernetes.io/component" = "database"
  }

  name         = "portfolio"
  username     = "portfolio"
  service      = "portfolio-postgres"
  database_url = "postgresql://${local.username}:${var.password}@${local.service}:5432/${local.name}?schema=public"
}
