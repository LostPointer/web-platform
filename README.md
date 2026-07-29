# LostPointer Web Platform

Shared, versioned web foundation for LostPointer applications. It keeps visual
language and cross-cutting frontend utilities consistent while each consuming
application keeps its own product domain and navigation.

The governing decision is [ADR-0001](docs/adr/0001-shared-web-platform.md).

## Planned packages

| Package | Responsibility |
| --- | --- |
| `@lostpointer/web-tokens` | Canonical design tokens and generated CSS, SCSS and TypeScript exports. |
| `@lostpointer/web-styles` | Reset, base styles and shared CSS layers. |
| `@lostpointer/web-mui` | MUI 7 theme adapter. |
| `@lostpointer/web-react` | Domain-neutral React primitives. |
| `@lostpointer/web-http` | Axios factory and transport-level error helpers. |
| `@lostpointer/web-testing` | Browser and React test helpers. |

This repository is intentionally documentation-only during P10-01. P10-02
will add the TypeScript monorepo, CI, Changesets and publishing workflow.
