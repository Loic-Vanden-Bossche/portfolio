resource "kubernetes_job_v1" "database_migration" {
  metadata {
    name      = "portfolio-migrate-${substr(sha256(var.image), 0, 8)}"
    namespace = var.namespace
    labels = merge(local.labels, {
      "app.kubernetes.io/component" = "migration"
    })
  }

  wait_for_completion = true

  timeouts {
    create = "10m"
    update = "10m"
  }

  spec {
    backoff_limit = 3

    template {
      metadata {
        labels = merge(local.labels, {
          "app.kubernetes.io/component" = "migration"
        })
      }

      spec {
        automount_service_account_token = false
        restart_policy                  = "Never"

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
          name              = "migration"
          image             = var.image
          image_pull_policy = var.image_pull_policy
          command           = ["yarn", "db:deploy"]

          security_context {
            allow_privilege_escalation = false
            privileged                 = false

            capabilities {
              drop = ["ALL"]
            }
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
              cpu    = "50m"
              memory = "128Mi"
            }
            limits = {
              cpu    = "500m"
              memory = "512Mi"
            }
          }
        }
      }
    }
  }
}
