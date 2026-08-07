import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    // Individual jsdom-dependent test files opt in via a
    // `// @vitest-environment jsdom` pragma at the top of the file (see
    // packages/react/src/*.test.tsx) rather than environmentMatchGlobs,
    // which this vitest version silently ignores for tsx globs.
    setupFiles: ['./packages/react/src/vitest.setup.ts'],
  },
})
