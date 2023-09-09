import { Meta, StoryObj } from '@storybook/react';
import { rest } from 'msw';
import {
	getLangDecorator,
	getRouterDecorator,
	getStoreDecorator,
	getThemeDecorator,
} from '@/shared/config/storybook';
import { Book } from '@/entities/Book';
import testImage from '@/shared/assets/img/test.jpg';
import { getBookPagePath } from '@/shared/const/router';
import BookPage from './BookPage';

const meta = {
	title: 'pages/BookPage',
	component: BookPage,
	parameters: {
		layout: 'fullscreen',
	},
	decorators: [
		getThemeDecorator(),
		getRouterDecorator({
			initialEntry: getBookPagePath('testId'),
			template: getBookPagePath(':bookId'),
		}),
		getStoreDecorator(),
		getLangDecorator(),
	],
} satisfies Meta<typeof BookPage>;

export default meta;
type Story = StoryObj<typeof meta>;

const getBookData = (full: boolean): Book => ({
	id: 'testId',
	volumeInfo: {
		title: 'Test title',
		categories: full ? ['Category1', 'Category2'] : undefined,
		description: full ? 'Test description' : undefined,
		imageLinks: {
			thumbnail: full ? testImage : '',
		},
		authors: full ? ['Author1', 'Author2'] : undefined,
		subtitle: full ? 'Test subtitle' : undefined,
	},
});

export const Full: Story = {};
Full.parameters = {
	msw: {
		handlers: [
			rest.get(`${__API__}/testId`, (_, res, ctx) => {
				return res(ctx.json(getBookData(true)));
			}),
		],
	},
};

export const Piece: Story = {};
Piece.parameters = {
	msw: {
		handlers: [
			rest.get(`${__API__}/testId`, (_, res, ctx) => {
				return res(ctx.json(getBookData(false)));
			}),
		],
	},
};

export const Loading: Story = {};
Loading.parameters = {
	msw: {
		handlers: [
			rest.get(`${__API__}/testId`, (_, res, ctx) => {
				return res(ctx.delay('infinite'));
			}),
		],
	},
};

export const Error: Story = {};
Error.parameters = {
	msw: {
		handlers: [
			rest.get(`${__API__}/testId`, (_, res, ctx) => {
				return res(ctx.status(404));
			}),
		],
	},
};
