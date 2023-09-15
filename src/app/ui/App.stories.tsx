import { Meta, StoryObj } from '@storybook/react';
import { rest } from 'msw';
import {
	getLangDecorator,
	getRouterDecorator,
	getStoreDecorator,
	getThemeDecorator,
} from '@/shared/config/storybook';
import { Book } from '@/entities/Book';
import testImg from '@/shared/assets/img/test.webp';
import { getBookPagePath } from '@/shared/const/router';
import App from './App';

const meta = {
	title: 'app/App',
	component: App,
	parameters: {
		layout: 'fullscreen',
	},
	decorators: [getThemeDecorator(), getLangDecorator(), getStoreDecorator()],
} satisfies Meta<typeof App>;

export default meta;
type Story = StoryObj<typeof meta>;

const books: DeepRequired<Book>[] = new Array(10).fill(0).map((_, index) => {
	return {
		id: `testId${index}`,
		volumeInfo: {
			title: 'Test title',
			subtitle: 'Test subtitle',
			authors: ['Author1', 'Author2'],
			imageLinks: {
				thumbnail: testImg,
			},
			description: 'Some Description',
			categories: ['history', 'art'],
		},
	};
});

const response = {
	totalItems: 10,
	items: books,
};

export const MainPageNormal: Story = {
	decorators: [getRouterDecorator({ withRoutes: false })],
};
MainPageNormal.parameters = {
	msw: {
		handlers: [
			rest.get(`${__API__}`, (_, res, ctx) => {
				return res(ctx.json(response));
			}),
		],
	},
};

export const MainPageError: Story = {
	decorators: [getRouterDecorator({ withRoutes: false })],
};
MainPageError.parameters = {
	msw: {
		handlers: [
			rest.get(`${__API__}`, (_, res, ctx) => {
				return res(ctx.status(404));
			}),
		],
	},
};

export const MainPageLoading: Story = {
	decorators: [getRouterDecorator({ withRoutes: false })],
};
MainPageLoading.parameters = {
	msw: {
		handlers: [
			rest.get(`${__API__}`, (_, res, ctx) => {
				return res(ctx.delay('infinite'));
			}),
		],
	},
};

export const BookPageNormal: Story = {
	decorators: [
		getRouterDecorator({
			withRoutes: false,
			initialEntry: getBookPagePath('testId0'),
		}),
	],
};
BookPageNormal.parameters = {
	msw: {
		handlers: [
			rest.get(`${__API__}/testId0`, (_, res, ctx) => {
				return res(ctx.json(books[0]));
			}),
		],
	},
};

export const BookPageError: Story = {
	decorators: [
		getRouterDecorator({
			withRoutes: false,
			initialEntry: getBookPagePath('testId0'),
		}),
	],
};
BookPageError.parameters = {
	msw: {
		handlers: [
			rest.get(`${__API__}/testId0`, (_, res, ctx) => {
				return res(ctx.status(404));
			}),
		],
	},
};

export const BookPageLoading: Story = {
	decorators: [
		getRouterDecorator({
			withRoutes: false,
			initialEntry: getBookPagePath('testId0'),
		}),
	],
};
BookPageLoading.parameters = {
	msw: {
		handlers: [
			rest.get(`${__API__}/testId0`, (_, res, ctx) => {
				return res(ctx.delay('infinite'));
			}),
		],
	},
};

export const NotFoundPage: Story = {
	decorators: [
		getRouterDecorator({ withRoutes: false, initialEntry: '/random' }),
	],
};
