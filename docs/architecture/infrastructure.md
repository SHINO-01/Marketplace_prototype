# Infrastructure & DevOps Architecture

## Cloud Footprint
- **Kubernetes**: Managed cluster (EKS/GKE/AKS) with namespaces per tier (`frontend`, `services`, `data`, `ops`).
- **Ingress**: NGINX Ingress Controller fronted by Cloudflare CDN/WAF, terminating TLS and forwarding mTLS to services.
- **Service Mesh (Future)**: Istio or Linkerd to enforce zero-trust, traffic policies, and observability.

## CI/CD Pipelines (GitLab)
1. **Lint & Test**: Node/PNPM pipeline for Next.js, Poetry/UV pipeline for FastAPI services.
2. **Security Gates**: SAST (GitLab Ultimate), dependency scanning, container image scanning.
3. **Artifact Build**: Docker images pushed to GitLab Registry or AWS ECR.
4. **Deploy**: Helm charts applied via `helm upgrade --install` or Argo CD sync. Canary deployments with progressive traffic shifting.

## Infrastructure as Code
- **Terraform**: Manages VPC, subnets, EKS cluster, RDS (PostgreSQL), OpenSearch, Redis (Elasticache), MSK (Kafka), S3 buckets.
- **Helm Charts**: Custom charts under `infra/helm/` for each microservice, plus shared library chart for common templates (env vars, probes, autoscaling).
- **GitOps**: Optional Argo CD monitoring infra repo for drift detection and automated rollbacks.

## Observability Stack
- **Metrics**: Prometheus Operator scraping `/metrics`. Grafana dashboards for services and business KPIs.
- **Tracing**: OpenTelemetry collectors forwarding to Jaeger/Tempo. Services instrumented via OTEL SDK.
- **Logging**: Fluent Bit DaemonSet shipping logs to OpenSearch with SIEM plugin enabled.

## Security Controls
- **Identity**: Keycloak for user auth; service accounts with OIDC tokens for workloads.
- **Secrets**: HashiCorp Vault (Agent Injector) populating env vars and mounted files. Vault sealed/unsealed via HSM or cloud KMS.
- **Network**: Calico/OPA Gatekeeper enforcing network policies; WAF rules on Cloudflare for L7 threats.
- **Compliance**: Audit logs streamed to SIEM; Sigma rules detect anomalies.

## Scalability & Resilience
- **Autoscaling**: HPA based on CPU/RAM + custom metrics (RQ latency). Karpenter/Cluster Autoscaler for node pools.
- **Resiliency**: Multi-AZ deployments, read replicas for PostgreSQL, cross-region S3 replication.
- **Backups**: Automated snapshots (RDS, OpenSearch), Velero for cluster backups, versioned S3 for assets.

## Roadmap Enhancements
- Introduce chaos engineering (Litmus) to validate resilience.
- Add Terraform Cloud/Atlantis for collaborative IaC workflows.
- Implement cost monitoring (Kubecost) and predictive scaling policies.
