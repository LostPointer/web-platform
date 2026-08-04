import type { Components, Theme } from '@mui/material/styles'
import { themes, type ThemeName } from '@lostpointer/web-tokens'
import { MuiButton } from './button.js'
import { MuiPaper } from './paper.js'
import { MuiDialog } from './dialog.js'
import { buildMuiDrawer } from './drawer.js'
import { buildInputComponents } from './input.js'
import { buildMuiChip } from './chip.js'
import { buildMuiTooltip } from './tooltip.js'
import { buildMuiSnackbarContent } from './snackbar.js'

export function buildComponents(mode: ThemeName): Components<Theme> {
  const t = themes[mode]

  return {
    MuiButton,
    MuiPaper,
    MuiDialog,
    MuiDrawer: buildMuiDrawer(t),
    ...buildInputComponents(t),
    MuiChip: buildMuiChip(t),
    MuiTooltip: buildMuiTooltip(t),
    MuiSnackbarContent: buildMuiSnackbarContent(t),
  }
}
