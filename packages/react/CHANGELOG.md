# @lostpointer/web-react

## 0.1.2

### Patch Changes

- 6fc39a1: Darken the light-theme `success` (#15803d), `warning` (#b45309), `error` (#b91c1c), `info` (#0369a1) and `textSecondary` (#5b6a80) colours so text and contained buttons reach 4.5:1 contrast on white and on the matching container backgrounds. Dark theme is unchanged.

## 0.1.1

### Patch Changes

- 5c40fc1: Publish the corrected stylesheet bundle for the React primitives package.

## 0.1.0

### Minor Changes

- f0a54d0: Add `@lostpointer/web-react`: domain-neutral, plain HTML/CSS React primitives (`PageHeader`, `Card`/`CardHeader`, `SectionHeader`, `EmptyState`, `StatusBadge`, `Loading`, `ErrorState`, `FormActions`, `FormDialog`, `PageContainer`, `AppHeaderBar`) with Storybook coverage and keyboard/screen-reader tested behavior. React is the only peer dependency; components never import application DTOs, API clients, routing, or React Query.
