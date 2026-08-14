resource "kubernetes_secret_v1" "registry" {
  count = var.ghcr_credentials == null ? 0 : 1

  metadata {
    name      = "portfolio-ghcr"
    namespace = var.namespace
    labels    = local.labels
  }

  type = "kubernetes.io/dockerconfigjson"

  data = {
    ".dockerconfigjson" = jsonencode({
      auths = {
        "ghcr.io" = {
          username = var.ghcr_credentials.username
          password = var.ghcr_credentials.token
          auth     = base64encode("${var.ghcr_credentials.username}:${var.ghcr_credentials.token}")
        }
      }
    })
  }
}
