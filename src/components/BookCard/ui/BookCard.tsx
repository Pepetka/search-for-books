import { memo, MouseEvent, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { getBookPagePath } from '@/shared/const/router';
import { IBook } from '@/shared/types/book';
import cls from './BookCard.module.scss';

interface IBookCardProps {
	bookData: DeepRequired<IBook>;
}

export const BookCard = memo((props: IBookCardProps) => {
	const { bookData } = props;
	const navigate = useNavigate();
	const anchorRef = useRef<HTMLAnchorElement | null>(null);

	const onCardClick = (event: MouseEvent<HTMLDivElement>) => {
		if (event.target !== anchorRef.current) {
			navigate(getBookPagePath(bookData.id));
		}
	};

	return (
		<div onClick={onCardClick} className={cls.BookCard}>
			<div className={cls.imageWrapper}>
				<img
					src={bookData.volumeInfo.imageLinks.thumbnail}
					alt={bookData.volumeInfo.title}
				/>
			</div>
			<div className={cls.category}>{bookData.volumeInfo.categories[0]}</div>
			<div className={cls.title}>{bookData.volumeInfo.title}</div>
			<div className={cls.authors}>
				{bookData.volumeInfo.authors.join(', ')}
			</div>
		</div>
	);
});
