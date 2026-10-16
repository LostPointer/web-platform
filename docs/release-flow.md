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
the same workflow publishes to the public npm registry.

- `main` publishes stable SemVer releases with npm dist-tag `latest`.
- `next` enters Changesets prerelease mode and publishes versions such as
  `0.1.0-next.0` with npm dist-tag `next`.

Create and protect the `next` branch before merging the first prerelease
changeset.

### npm authentication

Publishing uses npm Trusted Publishing. The workflow has `id-token: write`,
and pnpm exchanges the GitHub OIDC token for a short-lived publish token per
package, so no long-lived credential has to be rotated. Every published
package must have a trusted publisher on npmjs.com
(package → Settings → Trusted publishing → GitHub Actions):

| Field | Value |
| --- | --- |
| Organization or user | `LostPointer` |
| Repository | `web-platform` |
| Workflow filename | `release.yml` |
| Environment | empty |

The `repository.url` of each package must stay
`https://github.com/LostPointer/web-platform`; npm rejects an OIDC publish
whose package metadata points at another repository.

npm only offers this setting for a package that already exists. The first
release of a new package therefore uses the `NPM_TOKEN` repository secret: a
granular token with read and write access to the `@lostpointer` scope. pnpm
falls back to it only when the OIDC exchange is refused. After that first
release, add the trusted publisher for the new package and then delete or let
the token expire. Once every package has a trusted publisher, each package's
Publishing access can be set to "Require two-factor authentication and
disallow tokens". Consumer repositories never receive any npm credential.

Do not edit package versions manually. If an npm publish fails after the
release PR merge, fix the registry/authentication issue and re-run the release
workflow; npm versions are immutable.
