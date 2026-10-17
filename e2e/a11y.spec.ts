import AxeBuilder from '@axe-core/playwright'
import { expect, test } from '@playwright/test'
import { openStory, readStories } from './stories.js'

/**
 * Violations that exist in the design system today and need a token decision
 * (brand colours), not a test tweak. Every entry is tracked in
 * docs/accessibility-baseline.md. The suite fails when an entry no longer
 * reproduces, so fixing a colour forces the entry to be deleted.
 */
const knownViolations: Record<string, string[]> = {
  'mui-adapter-button--colors': ['color-contrast'],
  'mui-adapter-feedback--inputs': ['color-contrast'],
  'react-feedback--error-state-plain': ['color-contrast'],
  'react-feedback--error-state-with-retry': ['color-contrast'],
  'react-feedback--error-state-with-action': ['color-contrast'],
  'react-statusbadge--tones': ['color-contrast'],
}

const stories = readStories('no-a11y')

test.describe('axe smoke', () => {
  for (const story of stories) {
    test(`${story.title} / ${story.name}`, async ({ page }) => {
      await openStory(page, story.id)
      const { violations } = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
        .analyze()
      const known = knownViolations[story.id] ?? []
      const unexpected = violations.filter((v) => !known.includes(v.id))
      expect(
        unexpected.map((v) => `${v.id}: ${v.help} (${v.nodes.map((n) => n.target.join(' ')).join(', ')})`),
      ).toEqual([])
      const fixed = known.filter((id) => !violations.some((v) => v.id === id))
      expect(fixed, 'Known violation no longer reproduces: remove it from knownViolations').toEqual([])
    })
  }
})

test.describe('keyboard focus', () => {
  for (const story of stories) {
    test(`${story.title} / ${story.name}`, async ({ page }) => {
      await openStory(page, story.id)
      const focusable = await page
        .locator(
          ':is(#storybook-root, [role="dialog"]) :is(a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"]))',
        )
        .and(page.locator(':visible'))
        .count()
      test.skip(focusable === 0, 'No interactive elements in this story')

      const seen = new Set<string>()
      for (let step = 0; step < focusable; step += 1) {
        await page.keyboard.press('Tab')
        // The focus ring may transition in; wait for the next two frames to settle.
        await page.evaluate(() => new Promise((done) => requestAnimationFrame(() => requestAnimationFrame(done))))
        const state = await page.evaluate(() => {
          const el = document.activeElement
          if (!el || el === document.body) return null
          const hasRing = (target: Element | null, pseudo?: string) => {
            if (!target) return false
            const style = getComputedStyle(target, pseudo)
            return (style.outlineStyle !== 'none' && parseFloat(style.outlineWidth) > 0) || style.boxShadow !== 'none'
          }
          // MUI inputs draw the ring on the wrapping outline/underline, not the native <input>.
          const field = el.closest('.MuiInputBase-root')
          const visibleRing =
            hasRing(el) ||
            hasRing(field?.querySelector('.MuiOutlinedInput-notchedOutline') ?? null) ||
            (field !== null && getComputedStyle(field, '::after').transform !== 'none' && field.matches('.Mui-focused'))
          const box = el.getBoundingClientRect()
          return {
            key: `${el.tagName}:${el.textContent?.trim().slice(0, 30) ?? ''}:${box.x}:${box.y}`,
            visibleRing,
            inViewport: box.bottom > 0 && box.right > 0 && box.top < innerHeight && box.left < innerWidth,
          }
        })
        if (!state) continue
        expect(state.visibleRing, `focus ring on ${state.key}`).toBe(true)
        expect(state.inViewport, `${state.key} scrolled into view`).toBe(true)
        seen.add(state.key)
      }
      expect(seen.size, 'Tab reaches the interactive elements').toBeGreaterThan(0)
    })
  }
})

test.describe('reduced motion', () => {
  for (const story of stories) {
    test(`${story.title} / ${story.name}`, async ({ page }) => {
      await page.emulateMedia({ reducedMotion: 'reduce' })
      await openStory(page, story.id)
      const running = await page.evaluate(() =>
        document
          .getAnimations()
          .filter((animation) => {
            const timing = animation.effect?.getComputedTiming()
            return timing !== undefined && timing.iterations === Infinity
          })
          .map((animation) => animation.id || (animation as CSSAnimation).animationName || 'animation'),
      )
      expect(running, 'Infinite animations must stop under prefers-reduced-motion').toEqual([])
    })
  }
})
