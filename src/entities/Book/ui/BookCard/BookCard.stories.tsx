import type { Meta, StoryObj } from '@storybook/react';
import testImg from '@/shared/assets/img/test.jpg';
import { Book } from '@/entities/Book';
import {
	getRouterDecorator,
	getThemeDecorator,
} from '@/shared/config/storybook';
import { BookCard } from './BookCard';

const meta = {
	title: 'entities/Book/BookCard',
	component: BookCard,
	parameters: {
		layout: 'fullscreen',
	},
	decorators: [getRouterDecorator(), getThemeDecorator()],
} satisfies Meta<typeof BookCard>;

export default meta;
type Story = StoryObj<typeof meta>;

const bookData: DeepRequired<Book> = {
	id: 'testId',
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

export const Normal: Story = {
	args: {
		bookData,
	},
};
