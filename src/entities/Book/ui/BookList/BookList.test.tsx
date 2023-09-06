import '@testing-library/jest-dom';
import { screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { componentTestRender } from '@/shared/config/jest';
import { IBook } from '@/entities/Book';
import { BookList } from './BookList';

const books: DeepRequired<IBook>[] = new Array(3).fill(0).map((_, index) => ({
	id: `${index}`,
	volumeInfo: {
		title: 'Test title',
		authors: ['Author'],
		categories: ['math'],
		description: '',
		imageLinks: {
			thumbnail: '',
		},
		subtitle: '',
	},
}));

describe('BookList', () => {
	test('test content', async () => {
		await act(() => componentTestRender(<BookList books={books} />));

		expect(screen.getByTestId('BookList')).toBeInTheDocument();
		expect(screen.getAllByTestId('BookCard')).toHaveLength(3);
	});
});
