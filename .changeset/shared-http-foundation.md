---
"@lostpointer/web-http": minor
---

Add a domain-neutral Axios factory with credentials, timeout, AbortSignal, request IDs,
CSRF hooks and normalized errors. Application recovery interceptors run before final
normalization, so consumers retain ownership of authentication and refresh policy.
