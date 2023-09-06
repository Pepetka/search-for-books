import '@testing-library/jest-dom';
import { screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import { componentTestRender } from '@/shared/config/jest';
import { IBook } from '../../model/types/bookData';
import { BookCard } from './BookCard';

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
	...jest.requireActual('react-router-dom'),
	useNavigate: () => mockNavigate,
}));

const bookData: DeepRequired<IBook> = {
	id: '1',
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
};

describe('BookCard', () => {
	test('test content', async () => {
		await act(() => componentTestRender(<BookCard bookData={bookData} />));

		expect(screen.getByTestId('BookCard')).toBeInTheDocument();
		expect(screen.getByTestId('BookCard.title')).toHaveTextContent(
			bookData.volumeInfo.title
		);
		expect(screen.getByTestId('BookCard.authors')).toHaveTextContent(
			bookData.volumeInfo.authors.join(', ')
		);
		expect(screen.getByTestId('BookCard.category')).toHaveTextContent(
			bookData.volumeInfo.categories[0]
		);
	});

	test('click on the card', async () => {
		await act(() => componentTestRender(<BookCard bookData={bookData} />));

		const user = userEvent.setup();

		await user.click(screen.getByTestId('BookCard'));
	});
});
