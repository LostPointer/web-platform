import type { Components, Theme } from '@mui/material/styles'
import type { ThemeTokens } from '@lostpointer/web-tokens'
import { radii, shadows, typography } from '@lostpointer/web-tokens'

export function buildMuiTooltip(t: ThemeTokens): Components<Theme>['MuiTooltip'] {
  return {
    styleOverrides: {
      tooltip: {
        backgroundColor: t.text,
        color: t.background,
        borderRadius: radii.sm,
        fontSize: typography.fontSizes.xs,
        boxShadow: shadows['2'],
      },
      arrow: {
        color: t.text,
      },
    },
  }
}
