# Design tokens and base styles

`@lostpointer/web-tokens` is the canonical, application-neutral visual contract.
Its TypeScript objects, CSS custom properties, and Sass variables are generated
from `packages/tokens/tokens.json`.

## Usage

Import the complete browser foundation once in an application entrypoint:

```css
@import '@lostpointer/web-styles/index.css';
```

The stylesheet includes the locally packaged Inter variable font, token
variables, a browser-safe reset, and base typography and focus styles. Consumers
that do not want the base styles can import either token format directly:

```css
@import '@lostpointer/web-tokens/variables.css';
```

```scss
@use '@lostpointer/web-tokens/variables.scss' as tokens;
```

TypeScript consumers import stable token groups from the package root:

```ts
import { breakpoints, spacing, themes, type ThemeName } from '@lostpointer/web-tokens'
```

## Themes

Light values are the default on `:root`. Applications opt into dark mode by
setting `data-lp-theme="dark"` on the document element. The package deliberately
does not follow `prefers-color-scheme`; theme selection and persistence belong
to the consuming application.

Only semantic colors and shared foundations are canonical. Portal-specific
gradients, decorative backgrounds, component overlays, toast colors, sparkline
colors, and legacy variable aliases remain outside this package.

## Changing tokens

Edit `packages/tokens/tokens.json`, then run `pnpm --filter @lostpointer/web-tokens generate`.
CI runs the generator in check mode and fails if committed outputs are stale.
