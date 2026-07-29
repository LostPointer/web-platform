import { access } from 'node:fs/promises'
import { resolve } from 'node:path'
import { pathToFileURL } from 'node:url'
import { describe, expect, it } from 'vitest'

const packageDirectories = ['tokens', 'styles', 'mui']

describe('published package entrypoints', () => {
  for (const directory of packageDirectories) {
    it(`imports the built ${directory} ESM entrypoint`, async () => {
      const entrypoint = resolve('packages', directory, 'dist', 'index.js')

      await expect(access(entrypoint)).resolves.toBeUndefined()
      const module = await import(pathToFileURL(entrypoint).href)
      expect(Object.keys(module)).toEqual([])
    })
  }
})
