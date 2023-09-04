import { memo } from 'react';
import { BookCard } from '@/components/BookCard';
import { IBook } from '@/pages/MainPage/api/mainPageApi.ts';
import cls from './BookList.module.scss';

interface IBookListProps {
	books: IBook[];
}

export const BookList = memo((props: IBookListProps) => {
	const { books } = props;

	return (
		<div className={cls.BookList}>
			{books.map((book) => (
				<BookCard key={book.id} bookData={book} />
			))}
		</div>
	);
});
