# Local development and releases

## Local development

Use Node 24 and Corepack. A clean checkout is verified with:

```bash
corepack enable
pnpm install --frozen-lockfile
pnpm check
```

Packages are built independently with `pnpm build`. `pnpm check:exports` runs
`publint` against every package and the Vitest suite imports each generated ESM
entrypoint from `dist`.

## Changesets and publishing

Every public package change includes a changeset:

```bash
pnpm changeset
```

The release workflow runs only on protected `main` and `next`. Changesets
creates or updates a release PR; after the owner reviews and merges that PR,
the same workflow publishes to the public npm registry using `NPM_TOKEN`.

- `main` publishes stable SemVer releases with npm dist-tag `latest`.
- `next` enters Changesets prerelease mode and publishes versions such as
  `0.1.0-next.0` with npm dist-tag `next`.

Create and protect the `next` branch before merging the first prerelease
changeset. The first release also requires an npm automation token with publish
access to the public `@lostpointer` scope, stored as the `NPM_TOKEN` repository
secret. Consumer repositories never receive this credential.

Do not edit package versions manually. If an npm publish fails after the
release PR merge, fix the registry/authentication issue and re-run the release
workflow; npm versions are immutable.
