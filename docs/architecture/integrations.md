# Integrations & SDK Strategy

## Engine & Tool Integrations
- **Unity**
  - Custom Unity package delivering in-editor marketplace browser.
  - OAuth with Keycloak device flow; stores credentials in Unity preferences.
  - Direct asset import using `UnityWebRequest` streaming packages from TemuHash CDN.
  - Hooks into Unity Package Manager for version updates.
- **Unreal Engine**
  - Unreal plugin providing dockable marketplace panel.
  - Uses Epic Online Services identity bridging; downloads `.uasset` bundles to project `Content/TemuHash/`.
  - Automated build scripts integrate with Unreal Build Tool for asset versioning.
- **Godot**
  - GDNative plugin exposing TemuHash browser and asset install commands via CLI.
  - Export scripts auto-sync purchased assets into `res://addons/temuhash/`.
- **DCC Tools (Blender, Maya, 3ds Max)**
  - Python-based add-ons for Blender; C++/Python hybrid for Autodesk tools.
  - Supports one-click import of materials, meshes, and rigs with format conversion handled server-side.
  - Asset optimization service exposes API to convert to tool-specific formats before download.

## Developer APIs
- **REST**: Versioned endpoints exposed via API Gateway (`/v1/assets`, `/v1/orders`, `/v1/webhooks`). Supports API keys and OAuth client credentials.
- **GraphQL**: Apollo Federation gateway (future) enabling cross-service queries and subscription updates for live asset changes.
- **Webhooks**: Events (`asset.purchased`, `asset.updated`, `payout.processed`) delivered via signed payloads.
- **SDKs**:
  - JavaScript/TypeScript SDK for web integrations (Next.js, React Native).
  - C# SDK for Unity/NET clients with async streaming download support.
  - C++ SDK for Unreal/embedded systems.
  - Python SDK for pipeline automation and Blender plug-ins.

## CI/CD Integration for Creators
- **GitHub/GitLab Apps**: Creators link repositories; pushes to `asset-release` branch trigger build pipeline.
- **Asset Build Pipeline**:
  1. Webhook → TemuHash Build Worker.
  2. Run validation (lint, tests, format conversion).
  3. Package assets, update metadata, publish to staging.
  4. Moderation approval moves release to production catalog.
- **Versioning**: Semantic version tags align with catalog entries; diffs stored for rollback.

## Authentication & Permissions
- Keycloak clients created per integration; supports service accounts for automated pipelines.
- Role-based scopes (creator, studio, admin) control SDK features and API rate limits.

## Distribution & Updates
- CDN-backed downloads with signed URLs per session.
- Background updater in plugins checks for new versions, fetches changelogs via `/versions` endpoint.
- Offline cache support for studios behind restricted networks.

## Monitoring & Telemetry
- Integration SDKs emit telemetry (downloads, installs) to analytics pipeline with opt-in consent.
- Error reporting funnels into centralized logging (OpenSearch) and alerting (Prometheus).
