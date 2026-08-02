import { readFile, writeFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const packageRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const source = JSON.parse(await readFile(resolve(packageRoot, 'tokens.json'), 'utf8'))
const check = process.argv.includes('--check')

function kebab(value) {
  return value.replace(/([a-z0-9])([A-Z])/g, '$1-$2').replaceAll('.', '-') .toLowerCase()
}

function entries(value, prefix = []) {
  return Object.entries(value).flatMap(([key, child]) =>
    child !== null && typeof child === 'object' ? entries(child, [...prefix, key]) : [[...prefix, key, child]],
  )
}

const commonGroups = ['typography', 'spacing', 'radii', 'shadows', 'breakpoints', 'motion']
const commonEntries = commonGroups.flatMap((group) => entries(source[group], [group]))
const themeEntries = entries(source.themes.light)
const variableName = (path) => `--lp-${path.map(kebab).join('-')}`

const cssLines = (values, indent = '  ') => values.map((item) => {
  const value = item.at(-1)
  const path = item.slice(0, -1)
  return `${indent}${variableName(path)}: ${value};`
})

const css = [
  '/* Generated from tokens.json. Do not edit. */',
  ':root {',
  '  color-scheme: light;',
  ...cssLines([...themeEntries, ...commonEntries]),
  '}',
  '',
  '[data-lp-theme="dark"] {',
  '  color-scheme: dark;',
  ...cssLines(entries(source.themes.dark)),
  '}',
  '',
].join('\n')

const scssEntries = [...themeEntries.map((item) => ['color', ...item]), ...commonEntries]
const scss = [
  '// Generated from tokens.json. Do not edit.',
  ...scssEntries.map((item) => `$lp-${item.slice(0, -1).map(kebab).join('-')}: ${item.at(-1)};`),
  '',
].join('\n')

const cssVariableNames = Object.fromEntries(
  [...themeEntries, ...commonEntries].map((item) => [item.slice(0, -1).map(kebab).join('.'), variableName(item.slice(0, -1))]),
)
const ts = `/* Generated from tokens.json. Do not edit. */
export const palette = ${JSON.stringify(source.palette, null, 2)} as const
export const themes = ${JSON.stringify(source.themes, null, 2)} as const
export const typography = ${JSON.stringify(source.typography, null, 2)} as const
export const spacing = ${JSON.stringify(source.spacing, null, 2)} as const
export const radii = ${JSON.stringify(source.radii, null, 2)} as const
export const shadows = ${JSON.stringify(source.shadows, null, 2)} as const
export const breakpoints = ${JSON.stringify(source.breakpoints, null, 2)} as const
export const motion = ${JSON.stringify(source.motion, null, 2)} as const
export const cssVariableNames = ${JSON.stringify(cssVariableNames, null, 2)} as const

export type ThemeName = keyof typeof themes
export type ThemeTokens = (typeof themes)[ThemeName]
`

const outputs = new Map([
  [resolve(packageRoot, 'src/index.ts'), ts],
  [resolve(packageRoot, 'src/variables.css'), css],
  [resolve(packageRoot, 'src/variables.scss'), scss],
])

let stale = false
for (const [path, content] of outputs) {
  if (check) {
    const current = await readFile(path, 'utf8').catch(() => '')
    if (current !== content) {
      console.error(`${path} is not up to date`)
      stale = true
    }
  } else {
    await writeFile(path, content)
  }
}

if (stale) process.exitCode = 1
