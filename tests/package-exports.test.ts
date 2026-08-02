import { access } from 'node:fs/promises'
import { resolve } from 'node:path'
import { pathToFileURL } from 'node:url'
import { describe, expect, it } from 'vitest'

const packageDirectories = ['tokens', 'styles', 'mui'] as const
const expectedExports = {
  tokens: ['breakpoints', 'cssVariableNames', 'motion', 'palette', 'radii', 'shadows', 'spacing', 'themes', 'typography'],
  styles: [],
  mui: [],
}

describe('published package entrypoints', () => {
  for (const directory of packageDirectories) {
    it(`imports the built ${directory} ESM entrypoint`, async () => {
      const entrypoint = resolve('packages', directory, 'dist', 'index.js')

      await expect(access(entrypoint)).resolves.toBeUndefined()
      const module = await import(pathToFileURL(entrypoint).href)
      expect(Object.keys(module).sort()).toEqual(expectedExports[directory])
    })
  }

  it.each([
    ['tokens', 'variables.css'],
    ['tokens', 'variables.scss'],
    ['styles', 'index.css'],
    ['styles', 'reset.css'],
    ['styles', 'base.css'],
  ])('includes %s/%s in the built package', async (directory, file) => {
    await expect(access(resolve('packages', directory, 'dist', file))).resolves.toBeUndefined()
  })
})
