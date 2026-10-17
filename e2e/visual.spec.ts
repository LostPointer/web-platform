import { expect, test } from '@playwright/test'
import { openStory, readStories } from './stories.js'

// Light theme only, at the desktop and mobile projects from playwright.config.ts.
// A story that is nondeterministic by design carries the `no-visual` tag.
for (const story of readStories('no-visual')) {
  test(`${story.title} / ${story.name}`, async ({ page }) => {
    await openStory(page, story.id)
    await expect(page).toHaveScreenshot(`${story.id}.png`, { fullPage: true })
  })
}
