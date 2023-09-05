import { memo } from 'react';
import { useParams } from 'react-router-dom';
import { BookData } from '@/features/BookData';
import cls from './BookPage.module.scss';

export const BookPage = memo(() => {
	const { bookId = '' } = useParams<{ bookId: string }>();

	return (
		<div className={cls.BookPage}>
			<BookData bookId={bookId} />
		</div>
	);
});
