import type { Components, Theme } from '@mui/material/styles'
import { radii, shadows } from '@lostpointer/web-tokens'

const elevationShadows = [1, 2, 3] as const

export const MuiPaper: Components<Theme>['MuiPaper'] = {
  styleOverrides: {
    root: {
      backgroundImage: 'none',
      borderRadius: radii.md,
    },
  },
  variants: elevationShadows.map((elevation) => ({
    props: { elevation },
    style: { boxShadow: shadows[String(elevation) as keyof typeof shadows] },
  })),
}
