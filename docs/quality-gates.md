# Cross-repo quality gates (P10-10)

Shared components are checked in this repository before a release reaches the
consumer apps (task_tracker, experiment-portal).

## What runs here

`pnpm test:visual` runs Playwright against the static Storybook
(`pnpm build-storybook` first). For every story, in a desktop (1440 px) and a
mobile (390 px) project:

| Gate | Check |
| --- | --- |
| Visual regression | `toHaveScreenshot` of the full page, light theme, reduced motion |
| axe smoke | no WCAG 2.0/2.1 A/AA violations (`e2e/a11y.spec.ts`) |
| Keyboard focus | Tab reaches every interactive element, each shows a visible focus ring and stays in the viewport |
| Reduced motion | no infinite animation under `prefers-reduced-motion: reduce` |

Opt a story out with the Storybook tags `no-visual` or `no-a11y`; do it only
with a written reason in the story.

### Known accessibility violations

`knownViolations` in `e2e/a11y.spec.ts` lists the findings that exist today and
need a brand-colour decision, not a test change. The suite also fails when an
entry stops reproducing, so a fixed colour removes its own entry. Current list
(all `color-contrast`, WCAG 1.4.3):

- MUI contained Button `success`/`warning`/`info` (story `Button / Colors`)
- MUI TextField label (story `Feedback / Inputs`)
- `ErrorState` message and retry button
- `StatusBadge` tones

## Visual baselines

Baselines are PNGs in `e2e/__screenshots__/<project>/`. They are generated on
the CI runner (Ubuntu, Playwright pinned by the lockfile), not on a laptop, so
font rendering matches.

To change them intentionally:

1. Open the PR with the visual change.
2. Add the `update-visual-baselines` label (or run **Update visual baselines**
   manually on the branch). The workflow commits the new PNGs and restarts CI.
3. Review the changed images in the PR diff. A PR that changes PNGs without a
   matching visual change must not be merged.

## Release and compatibility checklist

Before publishing a shared package version and bumping it in the consumers:

- [ ] `pnpm check` and the `visual` CI job are green.
- [ ] Baseline changes, if any, were reviewed in the PR diff.
- [ ] Changeset describes any visual or behavioural change.
- [ ] Consumers pin the exact version (no `^`, `~`, `file:` or git refs). Each
      consumer enforces this in its own CI.
- [ ] Both consumers pass their own tests and accessibility checks with the new
      version before either merges the bump.
- [ ] Manual VoiceOver pass on the checklist below, for releases that change
      interactive components.

## Manual VoiceOver check (macOS Safari)

Not automatable; done by a person per release that touches interactive parts.

1. Enable VoiceOver (Cmd+F5), open the Storybook (`pnpm storybook`) in Safari.
2. For Button, TextField, Dialog, Drawer, Snackbar, Tooltip, FormDialog and
   ErrorState: move with VO+Right and confirm each control is announced with
   role and name.
3. Dialog and Drawer: focus moves inside on open, Escape closes, focus returns
   to the trigger.
4. ErrorState and Snackbar: the message is announced without moving focus.
5. Note anything that fails in the release PR.
