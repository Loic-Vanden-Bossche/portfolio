resource "kubernetes_deployment_v1" "application" {
  depends_on = [kubernetes_job_v1.database_migration]

  metadata {
    name      = "portfolio"
    namespace = var.namespace
    labels    = local.labels
  }

  spec {
    replicas                  = var.replicas
    revision_history_limit    = 3
    progress_deadline_seconds = 600

    strategy {
      type = "RollingUpdate"

      rolling_update {
        max_surge       = "1"
        max_unavailable = "0"
      }
    }

    selector {
      match_labels = local.labels
    }

    template {
      metadata {
        labels = local.labels
      }

      spec {
        automount_service_account_token = false

        dynamic "image_pull_secrets" {
          for_each = var.ghcr_credentials == null ? [] : [1]

          content {
            name = kubernetes_secret_v1.registry[0].metadata[0].name
          }
        }

        security_context {
          run_as_non_root = true
          run_as_user     = 1000
          run_as_group    = 1000

          seccomp_profile {
            type = "RuntimeDefault"
          }
        }

        container {
          name              = "portfolio"
          image             = var.image
          image_pull_policy = var.image_pull_policy

          security_context {
            allow_privilege_escalation = false
            privileged                 = false

            capabilities {
              drop = ["ALL"]
            }
          }

          port {
            name           = "http"
            container_port = 3000
          }

          env {
            name  = "NODE_ENV"
            value = "production"
          }

          env {
            name  = "HOSTNAME"
            value = "0.0.0.0"
          }

          env {
            name  = "PORT"
            value = "3000"
          }

          env {
            name = "DATABASE_URL"
            value_from {
              secret_key_ref {
                name = var.database_secret_name
                key  = "url"
              }
            }
          }

          resources {
            requests = {
              cpu    = "100m"
              memory = "256Mi"
            }
            limits = {
              cpu    = "1000m"
              memory = "768Mi"
            }
          }

          startup_probe {
            http_get {
              path = "/en"
              port = "http"
            }
            period_seconds    = 5
            timeout_seconds   = 3
            failure_threshold = 30
          }

          readiness_probe {
            http_get {
              path = "/api/health"
              port = "http"
            }
            period_seconds    = 10
            timeout_seconds   = 5
            failure_threshold = 6
          }

          liveness_probe {
            http_get {
              path = "/en"
              port = "http"
            }
            period_seconds    = 30
            timeout_seconds   = 5
            failure_threshold = 6
          }
        }
      }
    }
  }
}

resource "kubernetes_service_v1" "application" {
  metadata {
    name      = "portfolio"
    namespace = var.namespace
    labels    = local.labels
  }

  spec {
    selector = local.labels

    port {
      name        = "http"
      port        = 3000
      target_port = "http"
    }

    type = "ClusterIP"
  }
}
