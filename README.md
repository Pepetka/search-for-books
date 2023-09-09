## Production build

**[Search For Books](https://gentle-malasada-f879c0.netlify.app)**

## Запуск проекта

- `npm install` - установка зависимостей
- `npm run dev` - запуск dev проекта
- `npm run dev:docker` - запуск dev проекта в docker контейнере
- `npm run build:docker` - сборка и предпросмотр prod билда в docker контейнере

---

## Скрипты

- `npm run dev` - запуск dev проекта
- `npm run build` - сборка в prod режиме в папку dist
- `npm run dev:docker` - сборка и предпросмотр prod билда в docker контейнере
- `npm run build:docker` - сборка и предпросмотр prod билда в docker контейнере
- `npm run preview` - предпросмотр prod сборки
- `npm run lint:ts` - проверка ts файлов линтером
- `npm run lint:ts:fix` - исправление ts файлов линтером
- `npm run test:unit` - запуск unit тесов с jest
- `npm run test:e2e` - end-to-end тестирование приложения с cypress
- `npm run prepare` - прекоммит хуки с husky
- `npm run storybook` - запуск storybook
- `npm run storybook:build` - сборка storybook

---

## Архитектура проекта

В проекте использовалась архитектурная методология для фронтенд проектов - **Feature-Sliced Design**

Документация методологии - [Feature-Sliced Design (FSD)](https://feature-sliced.design/ru/docs)

---

## Интернационализация проекта

Для интернационализации проекта используется библиотека i18next.
Переводы хранятся в [public/locales](./public/locales).

Для комфортной работы с библиотекой рекомендуется установка соответствующих плагинов для среды разработки.

Документация библиотеки - [i18next](https://react.i18next.com/)

---

## Тестирование

Тестирование состоит их 3 типов тестов:
1) `npm run test:unit` - unit тестирование с jest
2) `npm run test:unit` - тестирование компонентов с React testing library
3) `npm run test:e2e` - end-to-end тестирование приложения с cypress

[Подробнее о тестировании](./docs/test.md)

---

## Линтинг и форматирование

В проекте используется eslint для проверки typescript кода.
Для форматирования используется prettier.

##### Скрипты для запуска линтеров и форматирования
- `npm run lint:ts` - проверка ts файлов линтером с правилами из prettier
- `npm run lint:ts:fix` - исправление ts файлов линтером с правилами из prettier

---

## Storybook

В проекте для каждого компонента описываются стори-кейсы.
Для перехвата запросов на сервер используется msw-storybook-addon.

Файл со стори-кейсами (.stories.tsx) находятся рядом с компонентом.

- `npm run storybook` - запуск storybook
- `npm run storybook:build` - сборка storybook

[Подробнее о Storybook](./docs/storybook.md)

---
## Конфигурация проекта

Конфиг vite - [vite.config.ts](./vite.config.ts)

- [config/jest/config](./config/jest/config) - конфигурация jest
- [cypress.config](./cypress.config.ts) - конфигурация cypress
- [.storybook](./.storybook) - конфигурация storybook

---

## CI pipeline и pre-commit хуки

Конфигурация github actions находится в /.github/workflows.
В ci прогоняются все виды тестов, сборка проекта и линтинг.

В прекоммит хуках происходит проверка линтинга и форматирования измененных файлов с помощью `lint-staged`, конфиг
находится в [/.husky](./.husky)

---

## Работа с состоянием проекта

Взаимодействие с данными осуществляется с помощью менеджера состояния redux toolkit.

Запросы на сервер отправляются с применением [RTK query](./src/shared/api/rtkApi.ts).

---

## Сущности (entities) по FSD

- [Book](./src/entities/Book)

---

## Фичи (features) по FSD

- [BookData](./src/features/BookData)
- [LangSwitcher](./src/features/LangSwitcher)
- [SearchBooks](./src/features/SearchBooks)
- [ThemeSwitcher](./src/features/ThemeSwitcher)
