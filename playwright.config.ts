import { defineConfig, devices } from '@playwright/test'

const PORT = 6007
const executablePath = process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH

/**
 * Visual and accessibility gates run against the static Storybook build, so a
 * shared component change shows up as a pixel diff in this repository before it
 * is released to the consumers. Build first: `pnpm build-storybook`.
 */
export default defineConfig({
  testDir: 'e2e',
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: 0,
  reporter: process.env.CI ? [['list'], ['html', { open: 'never' }]] : 'list',
  // One baseline set per project; update with `pnpm test:visual:update`.
  snapshotPathTemplate: '{testDir}/__screenshots__/{projectName}/{arg}{ext}',
  expect: {
    toHaveScreenshot: { animations: 'disabled', threshold: 0.02, maxDiffPixelRatio: 0.0001 },
  },
  use: {
    baseURL: `http://127.0.0.1:${PORT}`,
    colorScheme: 'light',
    reducedMotion: 'reduce',
    launchOptions: executablePath ? { executablePath } : {},
  },
  projects: [
    { name: 'desktop', use: { ...devices['Desktop Chrome'], viewport: { width: 1440, height: 900 } } },
    { name: 'mobile', use: { ...devices['Desktop Chrome'], viewport: { width: 390, height: 844 } } },
  ],
  webServer: {
    command: `node scripts/serve-static.mjs storybook-static ${PORT}`,
    url: `http://127.0.0.1:${PORT}/index.json`,
    reuseExistingServer: !process.env.CI,
  },
})
