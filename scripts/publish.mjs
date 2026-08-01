import { execFileSync } from 'node:child_process'
import { readFileSync } from 'node:fs'

const branch = process.env.GITHUB_REF_NAME

if (branch !== 'main' && branch !== 'next') {
  throw new Error(`Refusing to publish from unsupported branch: ${branch ?? 'unknown'}`)
}

// A package still sitting at the scaffold version has never been versioned by a
// changeset. Publishing it would burn 0.0.0 on the latest dist tag, so fail loudly
// instead: the branch is missing the changeset that should have bumped it.
const workspace = JSON.parse(
  execFileSync('pnpm', ['list', '--recursive', '--depth', '-1', '--json'], { encoding: 'utf8' }),
)

const scaffolded = workspace
  .filter((entry) => entry.path !== process.cwd())
  .filter((entry) => JSON.parse(readFileSync(`${entry.path}/package.json`, 'utf8')).private !== true)
  .filter((entry) => entry.version === '0.0.0')
  .map((entry) => entry.name)

if (scaffolded.length > 0) {
  throw new Error(`Refusing to publish unversioned packages: ${scaffolded.join(', ')}`)
}

execFileSync('pnpm', ['changeset', 'publish'], { stdio: 'inherit' })
