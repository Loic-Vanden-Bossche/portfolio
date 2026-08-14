resource "kubernetes_persistent_volume_claim_v1" "database" {
  wait_until_bound = false

  lifecycle {
    prevent_destroy = true
  }

  metadata {
    name      = "portfolio-postgres"
    namespace = var.namespace
    labels = merge(local.labels, {
      "chbrx.com/protected-data" = "true"
    })
  }

  spec {
    access_modes = ["ReadWriteOnce"]

    resources {
      requests = {
        storage = var.storage_size
      }
    }
  }
}

resource "kubernetes_deployment_v1" "database" {
  metadata {
    name      = local.service
    namespace = var.namespace
    labels    = local.labels
  }

  spec {
    replicas = 1

    strategy {
      type = "Recreate"
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

        container {
          name              = "postgres"
          image             = var.image
          image_pull_policy = "IfNotPresent"

          security_context {
            allow_privilege_escalation = false
            privileged                 = false
          }

          port {
            name           = "postgres"
            container_port = 5432
          }

          env {
            name  = "POSTGRES_DB"
            value = local.name
          }

          env {
            name  = "POSTGRES_USER"
            value = local.username
          }

          env {
            name = "POSTGRES_PASSWORD"
            value_from {
              secret_key_ref {
                name = kubernetes_secret_v1.database.metadata[0].name
                key  = "password"
              }
            }
          }

          resources {
            requests = {
              cpu    = "100m"
              memory = "256Mi"
            }
            limits = {
              cpu    = "750m"
              memory = "768Mi"
            }
          }

          volume_mount {
            name       = "database"
            mount_path = "/var/lib/postgresql/data"
          }

          readiness_probe {
            exec {
              command = ["pg_isready", "--dbname=${local.name}", "--username=${local.username}"]
            }
            initial_delay_seconds = 10
            period_seconds        = 10
            timeout_seconds       = 5
            failure_threshold     = 6
          }

          liveness_probe {
            exec {
              command = ["pg_isready", "--dbname=${local.name}", "--username=${local.username}"]
            }
            initial_delay_seconds = 30
            period_seconds        = 30
            timeout_seconds       = 5
            failure_threshold     = 6
          }
        }

        volume {
          name = "database"

          persistent_volume_claim {
            claim_name = kubernetes_persistent_volume_claim_v1.database.metadata[0].name
          }
        }
      }
    }
  }
}

resource "kubernetes_service_v1" "database" {
  metadata {
    name      = local.service
    namespace = var.namespace
    labels    = local.labels
  }

  spec {
    selector = local.labels

    port {
      name        = "postgres"
      port        = 5432
      target_port = "postgres"
    }

    type = "ClusterIP"
  }
}
