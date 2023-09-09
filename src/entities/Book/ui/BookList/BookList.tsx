import { memo } from 'react';
import { Book } from '../../model/types/bookData';
import { BookCard } from '../BookCard/BookCard';
import cls from './BookList.module.scss';

interface IBookListProps {
	books: DeepRequired<Book>[];
}

export const BookList = memo((props: IBookListProps) => {
	const { books } = props;

	return (
		<div data-testid="BookList" className={cls.BookList}>
			{books.map((book, index) => (
				<BookCard key={`${book.id}index:${index}`} bookData={book} />
			))}
		</div>
	);
});
