import { memo } from 'react';
import { BookCard } from '@/components/BookCard';
import { IBook } from '@/shared/types/book.ts';
import cls from './BookList.module.scss';

interface IBookListProps {
	books: DeepRequired<IBook>[];
}

export const BookList = memo((props: IBookListProps) => {
	const { books } = props;

	return (
		<div className={cls.BookList}>
			{books.map((book, index) => (
				<BookCard key={`${book.id}index:${index}`} bookData={book} />
			))}
		</div>
	);
});
