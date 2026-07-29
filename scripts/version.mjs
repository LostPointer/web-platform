import { existsSync } from 'node:fs'
import { execFileSync } from 'node:child_process'

const branch = process.env.GITHUB_REF_NAME

if (branch === 'next' && !existsSync('.changeset/pre.json')) {
  execFileSync('pnpm', ['changeset', 'pre', 'enter', 'next'], { stdio: 'inherit' })
}

if (branch === 'main' && existsSync('.changeset/pre.json')) {
  execFileSync('pnpm', ['changeset', 'pre', 'exit'], { stdio: 'inherit' })
}

execFileSync('pnpm', ['changeset', 'version'], { stdio: 'inherit' })
