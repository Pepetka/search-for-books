import { Meta, StoryObj } from '@storybook/react';
import { Book } from '@/entities/Book';
import testImg from '@/shared/assets/img/test.webp';
import {
	getRouterDecorator,
	getThemeDecorator,
} from '@/shared/config/storybook';
import { BookList } from './BookList';

const meta = {
	title: 'entities/Book/BookList',
	component: BookList,
	parameters: {
		layout: 'fullscreen',
	},
	decorators: [getRouterDecorator(), getThemeDecorator()],
} satisfies Meta<typeof BookList>;

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

export const Normal: Story = {
	args: {
		books,
	},
	parameters: {},
};
