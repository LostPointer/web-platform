import type { StorybookConfig } from '@storybook/react-vite'

/**
 * Root-level so any package can add `src/**\/*.stories.tsx` and be picked up
 * without touching this config — `packages/mui` is the first package to use
 * it, meant as the template for future shared packages.
 */
const config: StorybookConfig = {
  stories: ['../packages/*/src/**/*.stories.@(ts|tsx)'],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  addons: [],
  // Stories live in workspace packages, preview.tsx at the root. If pnpm
  // resolves two copies of MUI/emotion, the preview ThemeProvider silently
  // stops reaching story components (default blue theme, no focus ring).
  viteFinal: (viteConfig) => ({
    ...viteConfig,
    resolve: {
      ...viteConfig.resolve,
      dedupe: [...(viteConfig.resolve?.dedupe ?? []), '@mui/material', '@emotion/react', '@emotion/styled', 'react', 'react-dom'],
    },
  }),
}

export default config
