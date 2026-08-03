import type { Components, Theme } from '@mui/material/styles'
import type { ThemeTokens } from '@lostpointer/web-tokens'
import { radii } from '@lostpointer/web-tokens'
import { focusRingVar } from '../css-vars.js'

/**
 * `base.css` (from `@lostpointer/web-styles`) applies a global
 * `:focus-visible` outline to every focusable element. These input variants
 * draw their own outline/box-shadow ring on the wrapping notched
 * outline/underline instead, so the native `<input>`'s own focus-visible
 * outline is suppressed here to avoid a doubled ring.
 */
const suppressNativeFocusRing = {
  '& input:focus-visible, & textarea:focus-visible': {
    outline: 'none',
  },
}

function buildMuiOutlinedInput(t: ThemeTokens): Components<Theme>['MuiOutlinedInput'] {
  return {
    styleOverrides: {
      root: {
        borderRadius: radii.sm,
        '& .MuiOutlinedInput-notchedOutline': {
          borderColor: t.borderInput,
        },
        '&:hover .MuiOutlinedInput-notchedOutline': {
          borderColor: t.primary,
        },
        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
          borderColor: t.primary,
          boxShadow: `0 0 0 3px ${focusRingVar}`,
        },
        ...suppressNativeFocusRing,
      },
    },
  }
}

function buildMuiFilledInput(t: ThemeTokens): Components<Theme>['MuiFilledInput'] {
  return {
    styleOverrides: {
      root: {
        borderTopLeftRadius: radii.sm,
        borderTopRightRadius: radii.sm,
        '&:before': {
          borderBottomColor: t.borderInput,
        },
        '&:hover:not(.Mui-disabled):before': {
          borderBottomColor: t.primary,
        },
        '&.Mui-focused:after': {
          borderBottomColor: t.primary,
        },
        ...suppressNativeFocusRing,
      },
    },
  }
}

function buildMuiInputBase(): Components<Theme>['MuiInputBase'] {
  return {
    styleOverrides: {
      root: suppressNativeFocusRing,
    },
  }
}

export function buildInputComponents(t: ThemeTokens): Components<Theme> {
  return {
    MuiOutlinedInput: buildMuiOutlinedInput(t),
    MuiFilledInput: buildMuiFilledInput(t),
    MuiInputBase: buildMuiInputBase(),
  }
}
