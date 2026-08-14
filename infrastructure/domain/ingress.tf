resource "kubernetes_ingress_v1" "application" {
  metadata {
    name      = "portfolio"
    namespace = var.namespace
    labels = {
      "app.kubernetes.io/name"      = "portfolio"
      "app.kubernetes.io/component" = "application"
    }
    annotations = {
      "cert-manager.io/cluster-issuer"                 = var.certificate_issuer_name
      "nginx.ingress.kubernetes.io/backend-protocol"   = "HTTP"
      "nginx.ingress.kubernetes.io/force-ssl-redirect" = "true"
      "nginx.ingress.kubernetes.io/proxy-body-size"    = "10m"
      "nginx.ingress.kubernetes.io/ssl-redirect"       = "true"
    }
  }

  spec {
    ingress_class_name = var.ingress_class_name

    tls {
      hosts       = [var.hostname]
      secret_name = "portfolio-tls"
    }

    rule {
      host = var.hostname

      http {
        path {
          path      = "/"
          path_type = "Prefix"

          backend {
            service {
              name = var.service_name

              port {
                name = var.service_port_name
              }
            }
          }
        }
      }
    }
  }
}
