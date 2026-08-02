import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { describe, expect, it } from 'vitest'

describe('shared base styles', () => {
  const source = (name: string) => readFileSync(resolve('packages/styles/src', name), 'utf8')

  it('loads local Inter, tokens, reset, and base styles in layers', () => {
    const css = source('index.css')
    expect(css).toContain("@fontsource-variable/inter/index.css")
    expect(css).toContain("@lostpointer/web-tokens/variables.css")
    expect(css).toContain('@layer lp-reset, lp-tokens, lp-base;')
  })

  it('provides accessible focus, selection, and reduced-motion defaults', () => {
    const css = source('base.css')
    expect(css).toContain(':focus-visible')
    expect(css).toContain('::selection')
    expect(css).toContain('@media (prefers-reduced-motion: reduce)')
    expect(css).toContain('var(--lp-typography-font-family)')
  })
})
