# Backend Architecture

## Service Topology
TemuHash adopts a microservices-first approach. Each domain service exposes a gRPC contract and an internal REST API for operational access. The API Gateway (
`services/gateway/api-gateway/`) handles north-south traffic, request routing, authentication, and aggregation.

```
Client → API Gateway → gRPC → Domain Services → Data Stores
```

### Core Services
- **User Service (`services/user-service/`)**
  - Manages user profiles, roles, and creator onboarding metadata.
  - Integrates with Keycloak for identity lifecycle.
  - Stores data in PostgreSQL (`users`, `profiles`, `role_assignments`).
- **Catalog Service (`services/catalog-service/`)** *(skeleton TODO)*
  - Owns asset metadata, versioning, categories, tags, compatibility matrices.
  - Writes to PostgreSQL and pushes documents to OpenSearch (`assets` index).
  - Emits change events to Kafka for search indexing + notifications.
- **Commerce Service** *(future)*
  - Handles carts, orders, invoices, promotions, and licensing transactions.
  - Coordinates with Payment Service for capture/settlement.
- **Payment Service** *(future)*
  - Wraps Stripe/PayPal/crypto providers.
  - Manages payouts and compliance records.
- **Review Service** *(future)*
  - Ratings, reviews, media attachments, moderation hooks.
- **Favorites Service** *(future)*
  - Wishlist, favorites, personalized collections with Redis caching.
- **Admin Service** *(future)*
  - Moderation workflows, analytics aggregation, promotion management.

## Communication Patterns
- **North-South**: HTTPS REST via FastAPI gateway, NextAuth-protected routes.
- **East-West**: gRPC with protobuf contracts stored under `services/shared/proto/`.
- **Events**: Kafka topics (`asset.updated`, `order.completed`, etc.) for eventual consistency.

## Cross-Cutting Concerns
- **Configuration**: Pydantic Settings binds to environment variables per service.
- **Security**:
  - Keycloak-issued JWTs verified at gateway and services.
  - mTLS between services using service mesh (Istio/Linkerd) [future].
  - HashiCorp Vault injects secrets and DB credentials.
- **Observability**:
  - OpenTelemetry instrumentation in FastAPI and gRPC clients.
  - Prometheus scraping via `/metrics` endpoints (todo in app startup).
  - Jaeger for distributed traces.

## Deployment Workflow
1. Changes merged to main branch trigger GitLab CI.
2. Pipeline builds service containers, runs tests, and pushes to registry.
3. Helm charts deploy to Kubernetes namespaces (`frontend`, `services`, `data`).
4. Argo CD/GitOps monitors IaC repos for drift (optional future enhancement).

## Future Enhancements
- Implement GraphQL facade using Apollo Federation if cross-service queries become heavy.
- Introduce service templates via Cookiecutter to bootstrap new domains quickly.
- Add contract tests ensuring gateway ↔ services compatibility before deployment.
