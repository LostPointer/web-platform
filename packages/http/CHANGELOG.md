# @lostpointer/web-http

## 0.1.0

### Minor Changes

- d8c6d98: Add a domain-neutral Axios factory with credentials, timeout, AbortSignal, request IDs,
  CSRF hooks and normalized errors. Application recovery interceptors run before final
  normalization, so consumers retain ownership of authentication and refresh policy.
