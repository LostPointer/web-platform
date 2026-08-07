import eslint from '@eslint/js'
import globals from 'globals'
import tseslint from 'typescript-eslint'

export default tseslint.config(
  {
    ignores: ['**/dist/**', '**/node_modules/**', '**/coverage/**', 'storybook-static/**'],
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  {
    languageOptions: {
      globals: globals.node,
    },
  },
  {
    files: ['packages/*/src/stories/**', '.storybook/**'],
    languageOptions: {
      globals: globals.browser,
    },
  },
  {
    files: ['packages/*/src/**/*.test.ts', 'packages/*/src/**/*.test.tsx'],
    languageOptions: {
      globals: { ...globals.browser, ...globals.node },
    },
  },
)
