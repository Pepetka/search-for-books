import { Meta, StoryObj } from '@storybook/react';
import { rest } from 'msw';
import { Book } from '@/entities/Book';
import {
	getLangDecorator,
	getStoreDecorator,
	getThemeDecorator,
} from '@/shared/config/storybook';
import testImage from '@/shared/assets/img/test.jpg';
import { Lang } from '@/shared/const/lang';
import { BookData } from './BookData';

const meta = {
	title: 'features/BookData',
	component: BookData,
	parameters: {
		layout: 'fullscreen',
	},
	decorators: [
		getThemeDecorator(),
		getStoreDecorator(),
		getLangDecorator(Lang.EN),
	],
} satisfies Meta<typeof BookData>;

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

export const Full: Story = {
	args: {
		bookId: 'testId',
	},
};
Full.parameters = {
	msw: {
		handlers: [
			rest.get(`${__API__}/testId`, (_, res, ctx) => {
				return res(ctx.json(getBookData(true)));
			}),
		],
	},
};

export const Piece: Story = {
	args: {
		bookId: 'testId',
	},
};
Piece.parameters = {
	msw: {
		handlers: [
			rest.get(`${__API__}/testId`, (_, res, ctx) => {
				return res(ctx.json(getBookData(false)));
			}),
		],
	},
};

export const Loading: Story = {
	args: {
		bookId: 'testId',
	},
};
Loading.parameters = {
	msw: {
		handlers: [
			rest.get(`${__API__}/testId`, (_, res, ctx) => {
				return res(ctx.delay('infinite'));
			}),
		],
	},
};

export const Error: Story = {
	args: {
		bookId: 'testId',
	},
};
Error.parameters = {
	msw: {
		handlers: [
			rest.get(`${__API__}/testId`, (_, res, ctx) => {
				return res(ctx.status(404));
			}),
		],
	},
};
