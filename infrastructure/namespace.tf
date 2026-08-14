resource "kubernetes_namespace_v1" "portfolio" {
  metadata {
    name = var.namespace_name
    labels = {
      "app.kubernetes.io/name" = "portfolio"
    }
  }
}
