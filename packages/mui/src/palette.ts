import type { PaletteOptions } from '@mui/material/styles'
import { palette as tokenPalette, themes, type ThemeName } from '@lostpointer/web-tokens'
import type { LostpointerPalette } from './augmentation.js'

/**
 * `primary.light` is pinned to the indigo-300 rung to match the
 * product_dev_course reference theme exactly in light mode. The dark theme
 * has no equivalent exported rung, so it is left for MUI's own
 * `augmentColor` tonal derivation.
 */
export function buildPalette(mode: ThemeName): PaletteOptions {
  const t = themes[mode]

  const lp: LostpointerPalette = {
    surface: t.surface,
    surfaceMuted: t.surfaceMuted,
    surfaceVariant: t.surfaceVariant,
    border: t.border,
    borderInput: t.borderInput,
    textMuted: t.textMuted,
    primaryContainer: t.primaryContainer,
    successContainer: t.successContainer,
    warningContainer: t.warningContainer,
    errorContainer: t.errorContainer,
    infoContainer: t.infoContainer,
    focusRing: t.focusRing,
    selection: t.selection,
  }

  return {
    mode,
    primary: {
      main: t.primary,
      dark: t.primaryHover,
      contrastText: t.onPrimary,
      ...(mode === 'light' ? { light: tokenPalette.indigo['300'] } : {}),
    },
    error: { main: t.error, contrastText: t.onPrimary },
    warning: { main: t.warning, contrastText: t.onPrimary },
    success: { main: t.success, contrastText: t.onPrimary },
    info: { main: t.info, contrastText: t.onPrimary },
    background: {
      default: t.background,
      paper: t.surface,
    },
    text: {
      primary: t.text,
      secondary: t.textSecondary,
    },
    divider: t.border,
    lp,
  }
}
