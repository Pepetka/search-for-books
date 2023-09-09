## Storybook

Стори-кейсы каждого компонента находятся в файлах с расширением `.stories.tsx` рядом с файлами компонентов, к которым
эти стори-кейсы относятся.

- `npm run storybook` - запуск storybook
- `npm run storybook:build` - сборка storybook

Пример стори-кейса:
```typescript jsx
import type { Meta, StoryObj } from '@storybook/react';
import { Component } from './Component';

const meta = {
    title: 'Component',
    component: Component,
    parameters: {
        layout: 'fullscreen',
    },
} satisfies Meta<typeof Component>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Normal: Story = {
    args: {
        theme: 'normal',
    },
    decorators: [],
};
```

Пример перехвата запросов:
```typescript
Normal.parameters = {
    msw: {
        handlers: [
            rest.get(`${__API__}/users`, (_req, res, ctx) => {
                return res(ctx.json(users));
            }),
        ]
    },
};
```

Документация библиотеки - [storybook](https://storybook.js.org/docs)

Документация библиотеки - [msw-storybook-addon](https://storybook.js.org/addons/msw-storybook-addon)
