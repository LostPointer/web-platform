import type { Components, Theme } from '@mui/material/styles'
import type { ThemeTokens } from '@lostpointer/web-tokens'
import { radii, shadows, spacing } from '@lostpointer/web-tokens'

export function buildMuiSnackbarContent(t: ThemeTokens): Components<Theme>['MuiSnackbarContent'] {
  return {
    styleOverrides: {
      root: {
        borderRadius: radii.md,
        boxShadow: shadows['3'],
        backgroundColor: t.text,
        color: t.background,
        paddingBlock: spacing['2'],
        paddingInline: spacing['4'],
      },
    },
  }
}
