import type { Components, Theme } from '@mui/material/styles'
import { radii, shadows } from '@lostpointer/web-tokens'

export const MuiDialog: Components<Theme>['MuiDialog'] = {
  styleOverrides: {
    paper: {
      borderRadius: radii.lg,
      boxShadow: shadows['3'],
    },
  },
}
