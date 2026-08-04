import type { ThemeOptions } from '@mui/material/styles'
import { typography as t } from '@lostpointer/web-tokens'

type TypographyOptions = NonNullable<ThemeOptions['typography']>

export function buildTypography(): TypographyOptions {
  return {
    fontFamily: t.fontFamily,
    fontWeightRegular: t.fontWeights.regular,
    fontWeightMedium: t.fontWeights.medium,
    fontWeightBold: t.fontWeights.bold,
    h1: { fontSize: t.fontSizes['4xl'], fontWeight: t.fontWeights.semibold, lineHeight: t.lineHeights.tight },
    h2: { fontSize: t.fontSizes['3xl'], fontWeight: t.fontWeights.semibold, lineHeight: t.lineHeights.tight },
    h3: { fontSize: t.fontSizes['2xl'], fontWeight: t.fontWeights.semibold, lineHeight: t.lineHeights.tight },
    h4: { fontSize: t.fontSizes.xl, fontWeight: t.fontWeights.semibold, lineHeight: t.lineHeights.tight },
    h5: { fontSize: t.fontSizes.lg, fontWeight: t.fontWeights.medium, lineHeight: t.lineHeights.normal },
    h6: { fontSize: t.fontSizes.md, fontWeight: t.fontWeights.medium, lineHeight: t.lineHeights.normal },
    body1: { fontSize: t.fontSizes.body, fontWeight: t.fontWeights.regular, lineHeight: t.lineHeights.normal },
    body2: { fontSize: t.fontSizes.sm, fontWeight: t.fontWeights.regular, lineHeight: t.lineHeights.normal },
    caption: { fontSize: t.fontSizes.xs, fontWeight: t.fontWeights.regular, lineHeight: t.lineHeights.normal },
    button: { fontSize: t.fontSizes.sm, fontWeight: t.fontWeights.medium, lineHeight: t.lineHeights.normal, textTransform: 'none' },
  }
}
