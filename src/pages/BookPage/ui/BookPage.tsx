import { memo } from 'react';
import { useParams } from 'react-router-dom';
import { BookData } from '@/features/BookData';
import cls from './BookPage.module.scss';

const BookPage = memo(() => {
	const { bookId = '' } = useParams<{ bookId: string }>();

	return (
		<div data-testid="BookPage" className={cls.BookPage}>
			<BookData bookId={bookId} />
		</div>
	);
});

export default BookPage;
