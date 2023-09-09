import { memo, MouseEvent, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { getBookPagePath } from '@/shared/const/router';
import { AppImage } from '@/shared/ui/AppImage';
import { Book } from '../../model/types/bookData';
import cls from './BookCard.module.scss';

interface IBookCardProps {
	bookData: DeepRequired<Book>;
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
		<div data-testid="BookCard" onClick={onCardClick} className={cls.BookCard}>
			<AppImage
				className={cls.imageWrapper}
				src={bookData.volumeInfo.imageLinks.thumbnail}
				alt={bookData.volumeInfo.title}
				theme="invert"
			/>
			<div data-testid="BookCard.category" className={cls.category}>
				{bookData.volumeInfo.categories[0]}
			</div>
			<div data-testid="BookCard.title" className={cls.title}>
				{bookData.volumeInfo.title}
			</div>
			<div data-testid="BookCard.authors" className={cls.authors}>
				{bookData.volumeInfo.authors.join(', ')}
			</div>
		</div>
	);
});
