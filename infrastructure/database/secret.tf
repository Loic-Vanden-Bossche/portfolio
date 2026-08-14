resource "kubernetes_secret_v1" "database" {
  metadata {
    name      = "portfolio-database"
    namespace = var.namespace
    labels    = local.labels
  }

  type = "Opaque"

  data = {
    password = var.password
    url      = local.database_url
  }
}
