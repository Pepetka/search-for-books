import { memo, MouseEvent, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { IBook } from '@/pages/MainPage/api/mainPageApi.ts';
import { getBookPagePath } from '@/shared/const/router.ts';
import cls from './BookCard.module.scss';

interface IBookCardProps {
	bookData: IBook;
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
					src={
						bookData.volumeInfo.imageLinks.thumbnail ??
						bookData.volumeInfo.imageLinks.smallThumbnail
					}
					alt={bookData.volumeInfo.title}
				/>
			</div>
			<a
				ref={anchorRef}
				className={cls.category}
				target="_blank"
				href="http://localhost:5173/"
			>
				{bookData.volumeInfo.categories[0]}
			</a>
			<div className={cls.title}>{bookData.volumeInfo.title}</div>
			<div className={cls.authors}>
				{bookData.volumeInfo.authors.join(', ')}
			</div>
		</div>
	);
});
