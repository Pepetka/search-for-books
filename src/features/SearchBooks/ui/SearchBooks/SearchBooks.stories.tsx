import { Meta, StoryObj } from '@storybook/react';
import { rest } from 'msw';
import {
	getRouterDecorator,
	getStoreDecorator,
	getThemeDecorator,
} from '@/shared/config/storybook';
import { Book } from '@/entities/Book';
import testImg from '@/shared/assets/img/test.webp';
import { defaultSearchParams } from '@/shared/const/bookSort.ts';
import { SearchBooks } from './SearchBooks';

const meta = {
	title: 'features/SearchBooks/SearchBooks',
	component: SearchBooks,
	parameters: {
		layout: 'fullscreen',
	},
	decorators: [getThemeDecorator(), getStoreDecorator(), getRouterDecorator()],
} satisfies Meta<typeof SearchBooks>;

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

export const Normal: Story = {
	args: {
		searchParams: defaultSearchParams,
	},
};
Normal.parameters = {
	msw: {
		handlers: [
			rest.get(`${__API__}`, (_, res, ctx) => {
				return res(ctx.json(response));
			}),
		],
	},
};

export const Error: Story = {
	args: {
		searchParams: defaultSearchParams,
	},
};
Error.parameters = {
	msw: {
		handlers: [
			rest.get(`${__API__}`, (_, res, ctx) => {
				return res(ctx.status(404));
			}),
		],
	},
};

export const Loading: Story = {
	args: {
		searchParams: defaultSearchParams,
	},
};
Loading.parameters = {
	msw: {
		handlers: [
			rest.get(`${__API__}`, (_, res, ctx) => {
				return res(ctx.delay('infinite'));
			}),
		],
	},
};
