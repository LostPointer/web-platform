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

## Development

The repository is a pnpm workspace that requires Node 24. Run `corepack enable`
once, then use `pnpm install --frozen-lockfile` and `pnpm check` for the full
local verification suite.

The packages have deliberately empty entrypoints until their respective P10
implementation tasks define public APIs. Their ESM packaging, exports and npm
release pipeline are already validated in CI. See
[the release flow](docs/release-flow.md) for Changesets, prereleases and npm
publishing.

HTTP transport API and adoption: [HTTP foundation](docs/http.md).
