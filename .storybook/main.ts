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
}

export default config
