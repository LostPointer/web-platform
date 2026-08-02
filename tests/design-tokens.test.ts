import { execFileSync } from 'node:child_process'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import * as sass from 'sass'
import { describe, expect, it } from 'vitest'
import {
  breakpoints,
  cssVariableNames,
  motion,
  palette,
  radii,
  shadows,
  spacing,
  themes,
  typography,
} from '../packages/tokens/src/index.js'

const tokenPackage = resolve('packages/tokens')
const variablesCssPath = resolve(tokenPackage, 'src/variables.css')

describe('canonical design tokens', () => {
  it('exports every required foundation group', () => {
    expect(palette.indigo['500']).toBe('#4f46e5')
    expect(Object.values(typography.fontSizes)).toEqual(['12px', '14px', '15px', '16px', '18px', '20px', '24px', '32px', '40px'])
    expect(Object.values(typography.fontWeights)).toEqual([400, 500, 600, 700])
    expect(new Set(Object.values(spacing))).toEqual(new Set(['0', '4px', '6px', '8px', '10px', '12px', '16px', '20px', '24px', '32px', '40px', '48px', '64px']))
    expect(Object.values(radii)).toEqual(['8px', '12px', '20px', '999px'])
    expect(Object.keys(shadows)).toEqual(['1', '2', '3'])
    expect(Object.values(breakpoints)).toEqual(['600px', '900px', '1200px', '1920px', '2560px'])
    expect(Object.values(motion.durations)).toEqual(['100ms', '150ms', '200ms', '250ms'])
  })

  it('keeps semantic theme roles aligned and preserves portal light values', () => {
    expect(Object.keys(themes.dark)).toEqual(Object.keys(themes.light))
    expect(themes.light).toMatchObject({
      background: '#fafbfe', surface: '#fefefe', surfaceVariant: '#f1f5f9', border: '#e2e8f0',
      text: '#0f172a', textSecondary: '#64748b', primary: '#4f46e5', primaryHover: '#4338ca',
      success: '#16a34a', warning: '#d97706', error: '#dc2626', info: '#0284c7',
    })
  })

  it('only publishes lp-prefixed variable names and no legacy groups', () => {
    expect(Object.values(cssVariableNames).every((name) => name.startsWith('--lp-'))).toBe(true)
    expect(cssVariableNames).not.toHaveProperty('toast.success')
    expect(cssVariableNames).not.toHaveProperty('sparkline.area')
    expect(cssVariableNames).not.toHaveProperty('button.gradient')
  })

  it('generates deterministic checked-in outputs', () => {
    const before = readFileSync(variablesCssPath)
    execFileSync(process.execPath, ['scripts/generate.mjs'], { cwd: tokenPackage })
    const once = readFileSync(variablesCssPath)
    execFileSync(process.execPath, ['scripts/generate.mjs'], { cwd: tokenPackage })
    const twice = readFileSync(variablesCssPath)
    expect(once).toEqual(before)
    expect(twice).toEqual(once)
    execFileSync(process.execPath, ['scripts/generate.mjs', '--check'], { cwd: tokenPackage })
  })

  it('emits explicit light and dark selectors without automatic theme switching', () => {
    const css = readFileSync(variablesCssPath, 'utf8')
    expect(css).toContain(':root {')
    expect(css).toContain('[data-lp-theme="dark"] {')
    expect(css).not.toContain('prefers-color-scheme')
    for (const name of Object.values(cssVariableNames)) expect(css).toContain(`${name}:`)
  })

  it('compiles the published Sass variables', () => {
    expect(() => sass.compile(resolve(tokenPackage, 'src/variables.scss'))).not.toThrow()
  })
})
