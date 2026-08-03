# MUI adapter

`@lostpointer/web-mui` maps `@lostpointer/web-tokens` onto a MUI 7 theme, so
applications configure `<ThemeProvider>` once instead of maintaining their own
palette/typography/component overrides.

## Usage

```tsx
import { ThemeProvider } from '@mui/material/styles'
import { createLostpointerTheme } from '@lostpointer/web-mui'

const theme = createLostpointerTheme({ mode: 'light' })

function App() {
  return (
    <ThemeProvider theme={theme}>
      {/* ... */}
    </ThemeProvider>
  )
}
```

`@mui/material`, `@emotion/react`, and `@emotion/styled` are peer
dependencies — install them alongside this package.

## Themes

`createLostpointerTheme({ mode })` accepts `'light'` (default) or `'dark'`.
This mode is independent from the `data-lp-theme` attribute read by
`@lostpointer/web-tokens`/`@lostpointer/web-styles` — the application is
responsible for keeping both in sync (same ownership split documented for
tokens: theme selection and persistence belong to the consumer, never
`prefers-color-scheme`).

Extra `ThemeOptions` arguments deep-merge like MUI's own `createTheme`:

```ts
const theme = createLostpointerTheme({ mode: 'dark' }, { palette: { primary: { main: '#000' } } })
```

## The `lp` palette namespace

`@lostpointer/web-tokens` has more semantic colors than MUI's default
`Palette` shape supports (`surfaceVariant`, `borderInput`, `textMuted`, the
`*Container` colors, `focusRing`, `selection`). This package augments MUI's
`Palette`/`PaletteOptions` types with an `lp` namespace carrying those values:

```ts
theme.palette.lp.surfaceVariant
theme.palette.lp.focusRing
```

## Component overrides

`createLostpointerTheme()` themes `Button`, `Paper`, `Dialog`, `Drawer`,
`OutlinedInput`/`FilledInput`/`InputBase`, `Chip`, `Tooltip`, and
`SnackbarContent` using `radii`, `shadows`, `spacing`, and `typography` from
the tokens package. Focus-visible rings on inputs and buttons read the
`--lp-focus-ring` CSS variable, matching the global `:focus-visible` rule in
`@lostpointer/web-styles`'s base stylesheet.

This package does not enable `MuiCssBaseline` — `@lostpointer/web-styles`
already owns the global reset/focus/selection/reduced-motion layer. Adding
`CssBaseline` on top would risk a conflicting reset; that choice, if wanted at
all, belongs to the consuming application.

## Storybook

`packages/mui/src/stories/` has example galleries (`Button`, `Surfaces`,
`Feedback`) that exercise `createLostpointerTheme()` through the repo's
root-level Storybook, including a light/dark toolbar toggle. Run
`pnpm storybook` to view them locally.
