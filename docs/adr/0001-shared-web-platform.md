# ADR-0001: границы общей web-платформы, ownership и публикация

- **Статус:** accepted
- **Дата:** 2026-07-29
- **Владелец:** `LostPointer`

## Контекст

`task_tracker` и `product_dev_course` используют React 19, React Query v5 и
MUI 7, но их стили, базовые UI-решения и transport-утилиты развиваются
независимо. Визуальным эталоном становится Experiment Portal из
`product_dev_course`. Копирование значений и компонентов между репозиториями
создаёт расхождения и не даёт управляемого обновления.

Нужна небольшая публичная платформа, которую оба репозитория получают как
обычную versioned npm dependency, а не через `file:` или git dependency.

## Решение

Создаётся публичный репозиторий `LostPointer/web-platform` и npm scope
`@lostpointer`. Пакеты публикуются в публичный `https://registry.npmjs.org`.
Потребителям не нужны npm credentials ни в CI, ни в Docker builds.

Публикацию выполняет GitHub Actions из этого репозитория с `NPM_TOKEN`,
хранимым только в GitHub Actions secrets. Выпуск создаётся Changesets, а
публикация подтверждается владельцем репозитория.

### Пакеты и public exports

| Пакет | Public exports | Границы |
| --- | --- | --- |
| `@lostpointer/web-tokens` | token names, TypeScript values, CSS variables, SCSS variables | Только canonical palette, typography, spacing, radii, shadows, breakpoints и motion. |
| `@lostpointer/web-styles` | reset, base stylesheet, CSS layers | Только глобальные browser-safe defaults и общие visual utilities. |
| `@lostpointer/web-mui` | `createLostpointerTheme`, MUI augmentation types | Только MUI 7 theme/overrides; `@mui/material`, `@emotion/react` и `@emotion/styled` — peer dependencies. |
| `@lostpointer/web-react` | domain-neutral presentational primitives and accessibility helpers | Без router, data fetching, product terminology и application state. |
| `@lostpointer/web-http` | Axios factory, interceptors hooks, normalized transport errors | Без endpoints, generated clients, tokens или refresh policy. |
| `@lostpointer/web-testing` | React/browser setup and deterministic test helpers | Без fixtures, factories или assertions конкретного домена. |

### Границы приложений

Каждое приложение самостоятельно владеет:

- DTO, OpenAPI-generated clients и domain endpoints;
- routing, navigation, page layout, permissions, authentication и refresh;
- product state, feature flags, business rules и domain UI;
- application-specific telemetry, error copy и test fixtures.

Shared packages не содержат бизнес-моделей, navigation rules или knowledge о
`task_tracker` и `product_dev_course`.

### Совместимость

| Контракт | Поддержка |
| --- | --- |
| Runtime | Современные браузеры; ESM-only packages. |
| React primitives | React `^19`. |
| Data fetching integration | React Query `^5`; остаётся optional peer dependency для пакетов, которым она нужна. |
| MUI adapter | MUI 7 и Emotion 11 как peer dependencies. |
| Build/CI | Node 24; task_tracker обновляется до него в P10-06 до adoption shared packages. |
| Consumers | `task_tracker` и `product_dev_course` получают released SemVer versions, без `file:` и git dependencies. |

## Скоп MVP

P10-01 создаёт этот ADR, README, MIT license и CODEOWNERS. P10-02 добавляет
TypeScript monorepo, package builds, Changesets, CI, publish workflow и
consumer-update automation. P10-03 извлекает tokens; последующие P10 задачи
реализуют и подключают остальные пакеты.

## Не цели

- Не объединять два приложения в один frontend monorepo.
- Не переносить API-контракты, routing, authorization или domain UI в shared
  repository.
- Не заменить application-level adapters единой auth/refresh политикой.
- Не вводить отдельный private registry или npm credentials в consumer Docker
  images.

## Локальные styles и escape hatch

Canonical values экспортируются только с префиксом `--lp-`. Приложение может
добавлять локальные исключения исключительно под собственным корневым
`data-app` marker и в CSS layer `app-overrides`, подключённом после shared
styles. Оно не переопределяет `--lp-*` tokens и не меняет selectors shared
package. Если исключение требуется второму приложению, оно сначала становится
кандидатом на изменение shared package.

## Ownership, review и release policy

`LostPointer` владеет репозиторием, npm scope и release credentials. `main`
защищён: изменения выполняются через PR; ADR, package manifests, Changesets и
GitHub workflow требуют review владельца, согласно `CODEOWNERS`. Владелец может
применить emergency bypass с документированной причиной в PR или release note.

Versions следуют SemVer:

- **patch** исправляет ошибку без изменения публичного контракта;
- **minor** добавляет обратно-совместимый export или поведение;
- **major** удаляет/переименовывает export или меняет observable semantics.

Deprecated API помечается в exports/types и migration guide, остаётся доступным
минимум одну minor-версию и 90 календарных дней. Его removal требует major
release и записи в Changeset.

## Безопасность

`NPM_TOKEN` доступен только publish workflow. Public packages не должны
включать secrets, application configuration или user data. Consumer
repositories не хранят registry credentials и устанавливают пакеты с
публичного npm registry.

## Наблюдаемость

GitHub Actions, Changeset release PR, npm version и GitHub release образуют
audit trail выпусков. Каждый major/minor release содержит migration notes и
список затронутых пакетов. Ошибки установки или сборки наблюдаются в CI
потребителей; runtime telemetry остаётся application-specific.

## Открытые вопросы

- P10-02 выбирает конкретную package build layout и validates exports в CI.
- P10-03 фиксирует полный token schema и light/dark palette contract.
- P10-08 определяет минимальный набор React primitives после двух adoption
  пилотов.
- P10-09 определяет нормализованный HTTP error shape без изменения generated
  OpenAPI DTO task_tracker.
