import { createTheme, type Theme, type ThemeOptions } from '@mui/material/styles'
import type { ThemeName } from '@lostpointer/web-tokens'
import { buildPalette } from './palette.js'
import { buildTypography } from './typography.js'
import { buildShape } from './shape.js'
import { buildComponents } from './components/index.js'
import './augmentation.js'

export interface LostpointerThemeOptions {
  /**
   * Defaults to `'light'`. Never inferred from `prefers-color-scheme` —
   * mirrors `@lostpointer/web-tokens`: callers own dark-mode selection and
   * persistence, and are responsible for keeping this in sync with the
   * `data-lp-theme` attribute the token/style packages read.
   */
  mode?: ThemeName
}

export function createLostpointerTheme(options: LostpointerThemeOptions = {}, ...overrides: ThemeOptions[]): Theme {
  const { mode = 'light' } = options

  return createTheme(
    {
      palette: buildPalette(mode),
      typography: buildTypography(),
      shape: buildShape(),
      components: buildComponents(mode),
    },
    ...overrides,
  )
}
