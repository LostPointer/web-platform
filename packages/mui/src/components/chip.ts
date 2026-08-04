import type { Components, Theme } from '@mui/material/styles'
import type { ThemeTokens } from '@lostpointer/web-tokens'
import { radii } from '@lostpointer/web-tokens'

const containerColors = ['primary', 'success', 'warning', 'error', 'info'] as const

export function buildMuiChip(t: ThemeTokens): Components<Theme>['MuiChip'] {
  const containerFor: Record<(typeof containerColors)[number], string> = {
    primary: t.primaryContainer,
    success: t.successContainer,
    warning: t.warningContainer,
    error: t.errorContainer,
    info: t.infoContainer,
  }

  return {
    styleOverrides: {
      root: {
        borderRadius: radii.pill,
      },
    },
    variants: containerColors.map((color) => ({
      props: { variant: 'filled' as const, color },
      style: {
        backgroundColor: containerFor[color],
        color: t.text,
      },
    })),
  }
}
