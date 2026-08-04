import type { Components, Theme } from '@mui/material/styles'
import { radii, shadows, typography } from '@lostpointer/web-tokens'
import { focusRingVar } from '../css-vars.js'

export const MuiButton: Components<Theme>['MuiButton'] = {
  styleOverrides: {
    root: {
      borderRadius: radii.sm,
      fontWeight: typography.fontWeights.medium,
      '&:focus-visible': {
        outline: `3px solid ${focusRingVar}`,
        outlineOffset: '2px',
      },
    },
    contained: {
      boxShadow: shadows['1'],
      '&:hover': {
        boxShadow: shadows['2'],
      },
    },
  },
}
