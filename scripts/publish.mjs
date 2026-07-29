import { execFileSync } from 'node:child_process'

const branch = process.env.GITHUB_REF_NAME

if (branch !== 'main' && branch !== 'next') {
  throw new Error(`Refusing to publish from unsupported branch: ${branch ?? 'unknown'}`)
}

const tag = branch === 'next' ? 'next' : 'latest'
execFileSync('pnpm', ['changeset', 'publish', '--tag', tag], { stdio: 'inherit' })
