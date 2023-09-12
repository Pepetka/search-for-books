import { memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { getBookPagePath } from '@/shared/const/router';
import { AppImage } from '@/shared/ui/AppImage';
import { useParallaxTilt } from '@/shared/hooks/useParallaxTilt.ts';
import { classNames } from '@/shared/helpers/classNames/classNames.ts';
import { Book } from '../../model/types/bookData';
import cls from './BookCard.module.scss';

interface IBookCardProps {
	bookData: DeepRequired<Book>;
}

export const BookCard = memo((props: IBookCardProps) => {
	const { bookData } = props;
	const navigate = useNavigate();
	const { parallaxClasses, cardRef, onMouseLeave, onMouseMove } =
		useParallaxTilt();

	const onCardClick = () => {
		navigate(getBookPagePath(bookData.id));
	};

	return (
		<div
			onMouseMove={onMouseMove}
			onMouseLeave={onMouseLeave}
			className={cls.perspectiveWrapper}
			ref={cardRef}
		>
			<div
				data-testid="BookCard"
				onClick={onCardClick}
				className={classNames([cls.BookCard, parallaxClasses.parallaxTilt])}
			>
				<div className={parallaxClasses.layer1}>
					<AppImage
						className={cls.imageWrapper}
						src={bookData.volumeInfo.imageLinks.thumbnail}
						alt={bookData.volumeInfo.title}
						theme="invert"
					/>
				</div>
				<div className={parallaxClasses.layer2}>
					<div data-testid="BookCard.category" className={cls.category}>
						{bookData.volumeInfo.categories[0]}
					</div>
				</div>
				<div className={parallaxClasses.layer1}>
					<div data-testid="BookCard.title" className={cls.title}>
						{bookData.volumeInfo.title}
					</div>
				</div>
				<div className={parallaxClasses.layer2}>
					<div data-testid="BookCard.authors" className={cls.authors}>
						{bookData.volumeInfo.authors.join(', ')}
					</div>
				</div>
			</div>
		</div>
	);
});
