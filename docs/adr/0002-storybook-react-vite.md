# ADR-0002: Storybook via `@storybook/react-vite`, root-level config

- **Статус:** accepted
- **Дата:** 2026-08-03
- **Владелец:** `LostPointer`

## Контекст

P10-05 требует Storybook examples для `@lostpointer/web-mui`, но в
`web-platform` до этого не было ни Storybook config, ни зависимости. Это
первый пакет с stories, и решение должно стать шаблоном для последующих
пакетов (`web-react` и др.), а не одноразовой настройкой только под `mui`.

## Решение

Storybook настраивается один раз в корневом `.storybook/`, а не per-package.
`main.ts` использует glob `../packages/*/src/**/*.stories.@(ts|tsx)` — любой
пакет добавляет свои `*.stories.tsx` без изменения конфига.

Framework — `@storybook/react-vite`, а не webpack-based framework: весь
остальной tooling репозитория (`vitest`, `tsup`) уже Vite/ESM-first.

`storybook`/`@storybook/react-vite` живут в корневых `devDependencies` (как и
остальной tooling — `eslint`, `publint`, `tsup`). Story-файлы резолвят
`@mui/material`, `react`, `@emotion/*` из собственных `devDependencies`
пакета `packages/mui` под строгим pnpm-линкованием.

`build-storybook` встроен в `pnpm check`, поэтому CI (`.github/workflows/ci.yml`)
не требует отдельного шага — существующий единственный `verify` job уже
проверяет сборку Storybook.

## Не цели

- Не вводить отдельный CI job/matrix ради Storybook.
- Не публиковать Storybook как отдельный deployed artifact в рамках P10-05.

## P10-08: responsive React examples

В `.storybook/preview.tsx` заданы реальные viewport iframe: mobile 390×844,
tablet 1024×768 и desktop 1440×900. Stories `React/Layout` закрепляют размеры
через `globals.viewport`, включая mobile dark. Ограничение ширины контейнера
не заменяет viewport, поскольку не активирует CSS media queries.

React stories получают CSS tokens и `data-lp-theme`, но не MUI ThemeProvider;
MUI stories сохраняют provider. Toolbar переключает light/dark для stories,
у которых тема не закреплена.

Проверка P10-08: полный `pnpm check` (69 tests), затем Chromium с открытием
Storybook manager и измерением `innerWidth` внутри preview iframe. Для
390/1024/1440 px подтверждены ширина iframe, отсутствие горизонтального
переполнения и `flex-direction: column/row/row` у PageHeader. Mobile dark
проверен отдельно; снимки light/dark просмотрены.
