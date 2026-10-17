import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import type { Page } from '@playwright/test'

interface IndexEntry {
  id: string
  title: string
  name: string
  type: 'story' | 'docs'
  tags?: string[]
}

export interface Story {
  id: string
  title: string
  name: string
}

/** Stories listed in the static build; a story opts out of a gate with a `no-visual` tag. */
export function readStories(tag?: string): Story[] {
  const index = JSON.parse(readFileSync(resolve('storybook-static', 'index.json'), 'utf8')) as {
    entries: Record<string, IndexEntry>
  }
  return Object.values(index.entries)
    .filter((entry) => entry.type === 'story' && !(tag && entry.tags?.includes(tag)))
    .map(({ id, title, name }) => ({ id, title, name }))
}

export async function openStory(page: Page, id: string, theme: 'light' | 'dark' = 'light') {
  await page.goto(`/iframe.html?id=${id}&viewMode=story&globals=theme:${theme}`)
  // Dialogs and drawers render in a portal outside #storybook-root.
  await page.locator('#storybook-root > *, [role="dialog"]').first().waitFor()
  await page.evaluate(() => document.fonts.ready)
}
