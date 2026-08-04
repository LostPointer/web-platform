import type { Components, Theme } from '@mui/material/styles'
import type { ThemeTokens } from '@lostpointer/web-tokens'
import { shadows } from '@lostpointer/web-tokens'

export function buildMuiDrawer(t: ThemeTokens): Components<Theme>['MuiDrawer'] {
  return {
    styleOverrides: {
      paper: {
        boxShadow: shadows['3'],
        backgroundColor: t.surface,
        borderColor: t.border,
      },
    },
  }
}
