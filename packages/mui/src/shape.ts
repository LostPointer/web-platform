import type { ThemeOptions } from '@mui/material/styles'
import { radii } from '@lostpointer/web-tokens'

type ShapeOptions = NonNullable<ThemeOptions['shape']>

export function buildShape(): ShapeOptions {
  return {
    borderRadius: Number.parseInt(radii.md, 10),
  }
}
