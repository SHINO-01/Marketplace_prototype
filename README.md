# TemuHash Marketplace

TemuHash is a modular marketplace platform for buying and selling game assets such as 3D models, textures, audio, shaders, plugins, and scenes. The project is organized around a microservices architecture to streamline future feature additions and scalable deployment.

## Vision & Principles
- **Gaming-first**: tailored for asset creators and game studios.
- **Modular**: isolated services and UI modules for fast iteration.
- **Secure & Observable**: best-practice security, observability, and reliability baked in from day one.
- **Future-ready**: glassmorphism design language with both dark and light modes.

## Repository Structure
```
Marketplace_prototype/
├── docs/
│   ├── architecture/
│   │   ├── frontend.md
│   │   ├── backend.md
│   │   ├── data-platform.md
│   │   └── infrastructure.md
│   └── product/
│       └── feature-roadmap.md
├── frontend/
│   └── temu-hash-app/  # Next.js 14 (React 18) application
├── services/
│   ├── gateway/
│   │   └── api-gateway/  # FastAPI + GraphQL gateway (future GraphQL/Apollo integration)
│   ├── identity/
│   │   └── keycloak/  # Keycloak realm configuration, extensions, themes
│   ├── user-service/
│   ├── catalog-service/
│   ├── commerce-service/
│   ├── payment-service/
│   ├── review-service/
│   ├── favorites-service/
│   ├── admin-service/
│   └── shared/
│       ├── proto/  # gRPC definitions
│       └── schemas/  # Pydantic models, OpenAPI schemas
├── infra/
│   ├── terraform/
│   ├── helm/
│   ├── k8s/
│   └── ci-cd/
└── package.json  # Monorepo tooling (linting, scripts)
```

## High-Level Architecture

```mermaid
graph TD
    subgraph Frontend
        FE[Next.js (React 18) + Tailwind + React Query + NextAuth]
    end
    subgraph Gateway
        GW[FastAPI Gateway]
    end
    subgraph Microservices
        US[User Service]
        CS[Catalog Service]
        COM[Commerce Service]
        PS[Payment Service]
        RS[Review Service]
        FS[Favorites Service]
        AS[Admin Service]
    end
    subgraph Data Tier
        PG[(PostgreSQL)]
        OS[(OpenSearch)]
        RD[(Redis)]
        S3[(S3 Object Storage)]
    end
    subgraph Infrastructure
        K8s[Kubernetes]
        Vault[Vault]
        Kafka[Kafka]
        Prom[Prometheus/Grafana]
        OTEL[OpenTelemetry/Jaeger]
    end

    FE -->|HTTPS + NextAuth| GW
    GW -->|REST/gRPC| US
    GW -->|REST/gRPC| CS
    GW -->|REST/gRPC| COM
    GW -->|REST/gRPC| PS
    GW -->|REST/gRPC| RS
    GW -->|REST/gRPC| FS
    GW -->|REST/gRPC| AS

    US --> PG
    CS --> PG
    CS --> OS
    COM --> PG
    COM --> Kafka
    PS --> Kafka
    RS --> PG
    FS --> Redis
    AS --> PG

    Kafka --> CS
    Kafka --> AS

    S3 --> CS
    S3 --> COM

    K8s --> FE
    K8s --> GW
    K8s --> US
    K8s --> CS
    K8s --> COM
    K8s --> PS
    K8s --> RS
    K8s --> FS
    K8s --> AS

    Vault --> GW
    Vault --> Microservices

    Prom --> K8s
    OTEL --> Microservices
```

## Modules Overview
- **Frontend (`frontend/temu-hash-app/`)**: Next.js 14 with Tailwind, glassmorphism UI, dark/light theming, React Query for API caching, and NextAuth for authentication.
- **Gateway (`services/gateway/api-gateway/`)**: FastAPI gateway exposing REST endpoints (GraphQL-ready), handling auth verification, and orchestrating calls to downstream services via gRPC.
- **User Service**: Manages user profiles, roles, permissions, creator onboarding, and integrations with Keycloak.
- **Catalog Service**: Handles asset metadata, categories, tags, search indexing (OpenSearch), asset versioning, and preview generation pipelines.
- **Commerce Service**: Manages carts, orders, invoices, promotions, taxes, and integrates with the Payment Service.
- **Payment Service**: Abstracts payment processors (Stripe, PayPal, optional crypto) and payout workflows.
- **Review Service**: Manages ratings, reviews, Q&A threads, and moderation hooks.
- **Favorites Service**: Tracks favorites, wishlists, and personalized collections using Redis for fast access.
- **Admin Service**: Provides moderation, approvals, featured placements, analytics dashboards, and rule engines.
- **AI/ML Platform**: Dedicated intelligence services powering semantic search, auto-tagging, recommendations, quality scoring, and optimization workflows.
- **Engagement Service** (future): Badge engine, leaderboards, referral tracking, notification orchestration, and subscription metering.
- **Integration SDKs**: Unity, Unreal, Godot, Blender, Maya, 3ds Max plugins plus REST/GraphQL SDKs documented in `docs/architecture/integrations.md`.
- **Shared (`services/shared/`)**: Houses reusable contracts, protobuf definitions, enums, and shared libraries.

## Cross-Cutting Concerns
- **Authentication & Authorization**: Keycloak as the identity provider with OIDC/OAuth2 flows. Services validate JWTs and use service accounts for inter-service communication through mTLS.
- **Observability**: OpenTelemetry for traces, Prometheus for metrics, Grafana dashboards, and OpenSearch/Fluent Bit for logs.
- **Security**: Cloudflare WAF, NGINX Ingress, HashiCorp Vault for secrets, CIS benchmarked images.
- **CI/CD**: GitLab pipelines orchestrate builds, tests, security scans (SAST/DAST), container builds, Helm releases, and canary deployments.
- **Infrastructure as Code**: Terraform for cloud resources, Helm charts for K8s deployments, automated via GitOps (Argo CD optional in future).

## Documentation Additions
- **AI & ML**: `docs/architecture/ai-ml.md` details semantic search, recommendations, asset quality scoring, and optimization pipelines.
- **Integrations**: `docs/architecture/integrations.md` covers engine plugins, SDKs, APIs, and creator CI/CD workflows.
- **Growth & Engagement**: `docs/product/growth-engagement.md` outlines badges, leaderboards, referrals, notifications, seasonal events, and subscription tiers.
- **Security & Trust**: `docs/architecture/security-trust.md` summarizes malware scanning, DRM, MFA, compliance, and audit logging strategies.
- **Infrastructure**: `docs/architecture/infrastructure.md` highlights Kubernetes, Terraform, Helm, observability, and security controls.

## Tooling & Configuration
- **Environment Templates**: `.env.example` files added for frontend and core services with placeholders for Keycloak, Stripe, OTEL, Redis, and storage endpoints.
- **Dependency Baselines**: `pyproject.toml` and Next.js `package.json` prepared for consistent package management.
- **Local Orchestration**: `scripts/start_local.py` gradually starts services (user, catalog, gateway, frontend) using health checks; see `docs/tooling/local-orchestration.md`.

## Next Steps
1. Install dependencies (`npm install`, `uv sync`) and configure environment variables from `.env.example` templates.
2. Implement AI/ML service scaffolding, recommendation APIs, and moderation workflows per architecture docs.
3. Expand Terraform and Helm assets under `infra/` for environment provisioning and deployment automation.
4. Build integration SDKs and CI/CD connectors for engine toolchains.
