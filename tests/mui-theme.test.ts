import { describe, expect, it } from 'vitest'
import { createLostpointerTheme } from '../packages/mui/src/index.js'
import { themes } from '../packages/tokens/src/index.js'

function toRgb(hex: string) {
  const normalized = hex.length === 4
    ? `#${[...hex.slice(1)].map((c) => c + c).join('')}`
    : hex
  return normalized.toLowerCase()
}

describe('createLostpointerTheme', () => {
  it('defaults to light mode', () => {
    const theme = createLostpointerTheme()
    expect(theme.palette.mode).toBe('light')
  })

  it('matches the product_dev_course reference palette in light mode', () => {
    const theme = createLostpointerTheme({ mode: 'light' })

    expect(theme.palette.primary.main).toBe('#4f46e5')
    expect(theme.palette.primary.dark).toBe('#4338ca')
    expect(theme.palette.primary.light).toBe('#818cf8')
    expect(toRgb(theme.palette.primary.contrastText)).toBe(toRgb('#fff'))

    expect(theme.palette.error.main).toBe(themes.light.error)
    expect(theme.palette.warning.main).toBe(themes.light.warning)
    expect(theme.palette.success.main).toBe(themes.light.success)
    expect(theme.palette.info.main).toBe(themes.light.info)
  })

  it('threads the dark mode API through without a bespoke dark design', () => {
    const theme = createLostpointerTheme({ mode: 'dark' })

    expect(theme.palette.mode).toBe('dark')
    expect(theme.palette.primary.main).toBe(themes.dark.primary)
    expect(theme.palette.error.main).toBe(themes.dark.error)
    expect(theme.palette.warning.main).toBe(themes.dark.warning)
    expect(theme.palette.success.main).toBe(themes.dark.success)
    expect(theme.palette.info.main).toBe(themes.dark.info)
  })

  it('exposes the lp semantic palette namespace for both modes', () => {
    for (const mode of ['light', 'dark'] as const) {
      const theme = createLostpointerTheme({ mode })
      expect(theme.palette.lp.surfaceVariant).toBe(themes[mode].surfaceVariant)
      expect(theme.palette.lp.borderInput).toBe(themes[mode].borderInput)
      expect(theme.palette.lp.textMuted).toBe(themes[mode].textMuted)
      expect(theme.palette.lp.primaryContainer).toBe(themes[mode].primaryContainer)
      expect(theme.palette.lp.focusRing).toBe(themes[mode].focusRing)
      expect(theme.palette.lp.selection).toBe(themes[mode].selection)

      // Type-level regression guard for the ADR-mandated Palette augmentation:
      // this only compiles because augmentation.ts's `declare module` ran.
      const surfaceVariant: string = theme.palette.lp.surfaceVariant
      expect(typeof surfaceVariant).toBe('string')
    }
  })

  it('derives shape and typography from canonical tokens', () => {
    const theme = createLostpointerTheme()
    expect(theme.shape.borderRadius).toBe(12)
    expect(theme.typography.fontFamily).toContain('Inter Variable')
  })

  it('themes every component named in the P10-05 acceptance criteria', () => {
    const theme = createLostpointerTheme()
    const themedComponents = [
      'MuiButton',
      'MuiPaper',
      'MuiDialog',
      'MuiDrawer',
      'MuiOutlinedInput',
      'MuiChip',
      'MuiTooltip',
      'MuiSnackbarContent',
    ] as const

    for (const component of themedComponents) {
      expect(theme.components?.[component]).toBeDefined()
    }
  })

  it('deep-merges trailing theme option overrides like MUI createTheme', () => {
    const theme = createLostpointerTheme({ mode: 'light' }, { palette: { primary: { main: '#000000' } } })
    expect(theme.palette.primary.main).toBe('#000000')
    expect(theme.palette.mode).toBe('light')
  })
})
