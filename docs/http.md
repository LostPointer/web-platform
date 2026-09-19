# HTTP foundation

`@lostpointer/web-http` supplies an Axios instance and `HttpError`. It contains no
endpoints, DTOs, authentication tokens, refresh rules, UI notifications or project
context. The initial Changeset releases version **0.1.0**.

```ts
import { createHttpClient, HttpError } from '@lostpointer/web-http'

const client = createHttpClient({
  baseURL: '/api',
  timeoutMs: 15_000,
  withCredentials: true,
  csrfToken: () => readApplicationCsrfCookie(),
  configure(instance) {
    // Install application-owned refresh/telemetry interceptors here.
    // They see the original Axios error, before final normalization.
  },
})

const controller = new AbortController()
await client.get('/resource', { signal: controller.signal, timeout: 5_000 })
```

The defaults are credentialed requests, a 15-second Axios timeout, and
`crypto.randomUUID()` for an absent `X-Request-Id`. A supplied request ID is
preserved, including on retries. CSRF hooks run for POST, PUT, PATCH and DELETE;
explicit CSRF headers are preserved. Applications own the base URL and must
supply appropriate hooks for their environment. Request options can override
timeout and credentials. No requests are automatically retried.

Response parsing preserves JSON, plain text, empty bodies and null. A malformed
JSON success is `invalid_response`; malformed/non-JSON HTTP error bodies remain
`api` errors. JSON error envelopes preserve `code`, `message` (or `error`), `field`
and `requestId`; the response request-ID header is the fallback. Binary response
bodies remain unchanged.

| kind | Meaning | Default code |
| --- | --- | --- |
| `api` | Non-success HTTP response | `http_error` |
| `timeout` | Axios deadline expired | `timeout` |
| `aborted` | Caller cancelled the request | `aborted` |
| `network` | No HTTP response | `network_error` |
| `invalid_response` | Successful response contained malformed JSON | `invalid_json` |

Errors expose `status`, `code`, `field`, `requestId`, `message` and the original
`cause`. Applications can translate messages or map to their existing error
class. `normalizeHttpError` is idempotent for an existing `HttpError`.

## Interceptor order

1. Shared response decoding.
2. Application interceptors registered in `configure` (including refresh/retry).
3. Final error normalization.

Register recovery **inside `configure`**, not after `createHttpClient` returns.
A refresh implementation must bound retries and respect cancellation. A retry
must use the configured instance. Application notifications belong after
recovery or at the application request boundary.

## Adoption

- `task_tracker`: generated `@hey-api/client-axios` SDK, application `ApiError`,
  notification policy and OpenAPI contracts stay in the tracker. Its wrapper
  preserves null/undefined because Hey API otherwise replaces them with `{}`.
- `product_dev_course`: Projects is the first domain; other clients remain
  unchanged. Session recovery is shared locally between legacy and migrated
  clients. Project/space parameters remain application-owned.

## Verification and release

`pnpm check` includes transport unit tests and a real loopback HTTP server test
for slow headers/body, cancellation, socket failure and response parsing.
The tracker additionally exercises Chromium's Axios adapter and a login/space
creation UI flow with controlled responses.

Merge the package change, then review the Changesets release PR. After 0.1.0 is
published, install `@lostpointer/web-http@0.1.0` with each consumer's package
manager and regenerate its lockfile. Consumer adoption must not merge while it
references a local tarball. Before release, local tarball installation is only
an integration-test fixture, not a production dependency.
