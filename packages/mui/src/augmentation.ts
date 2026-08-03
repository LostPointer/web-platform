export interface LostpointerPalette {
  surface: string
  surfaceMuted: string
  surfaceVariant: string
  border: string
  borderInput: string
  textMuted: string
  primaryContainer: string
  successContainer: string
  warningContainer: string
  errorContainer: string
  infoContainer: string
  focusRing: string
  selection: string
}

declare module '@mui/material/styles' {
  interface Palette {
    lp: LostpointerPalette
  }
  interface PaletteOptions {
    lp?: LostpointerPalette
  }
}
