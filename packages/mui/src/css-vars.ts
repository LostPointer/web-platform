import { cssVariableNames } from '@lostpointer/web-tokens'

/**
 * References the CSS custom property (not a resolved hex) so component
 * focus/selection treatment stays visually consistent with the global
 * `:focus-visible`/`::selection` rules in `@lostpointer/web-styles`'s
 * base.css, which read the same variables.
 */
export const focusRingVar = `var(${cssVariableNames['focus-ring']})`
