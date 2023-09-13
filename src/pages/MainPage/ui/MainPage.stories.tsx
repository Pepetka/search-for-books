import { Meta, StoryObj } from '@storybook/react';
import { rest } from 'msw';
import {
	getLangDecorator,
	getRouterDecorator,
	getStoreDecorator,
	getThemeDecorator,
} from '@/shared/config/storybook';
import testImg from '@/shared/assets/img/test.webp';
import { Book } from '@/entities/Book';
import MainPage from './MainPage';

const meta = {
	title: 'pages/MainPage',
	component: MainPage,
	parameters: {
		layout: 'fullscreen',
	},
	decorators: [
		getThemeDecorator(),
		getRouterDecorator(),
		getStoreDecorator(),
		getLangDecorator(),
	],
} satisfies Meta<typeof MainPage>;

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

export const Normal: Story = {};
Normal.parameters = {
	msw: {
		handlers: [
			rest.get(`${__API__}`, (_, res, ctx) => {
				return res(ctx.json(response));
			}),
		],
	},
};

export const Error: Story = {};
Error.parameters = {
	msw: {
		handlers: [
			rest.get(`${__API__}`, (_, res, ctx) => {
				return res(ctx.status(404));
			}),
		],
	},
};

export const Loading: Story = {};
Loading.parameters = {
	msw: {
		handlers: [
			rest.get(`${__API__}`, (_, res, ctx) => {
				return res(ctx.delay('infinite'));
			}),
		],
	},
};
