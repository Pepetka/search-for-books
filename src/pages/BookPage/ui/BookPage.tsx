import { memo } from 'react';
import { useParams } from 'react-router-dom';
import fallbackImg from '@/shared/assets/img/fallback.jpg';
import { useFetchBookItemDataQuery } from '../api/bookPageApi';
import cls from './BookPage.module.scss';

export const BookPage = memo(() => {
	const { bookId = '' } = useParams<{ bookId: string }>();
	const { data, isError, isFetching } = useFetchBookItemDataQuery(
		{ bookId },
		{ refetchOnMountOrArgChange: true }
	);

	if (isFetching || !data) {
		return <div>Loading...</div>;
	}

	if (isError) {
		return <div>Something went wrong</div>;
	}

	return (
		<div className={cls.BookPage}>
			<div className={cls.imageWrapper}>
				<img
					src={data.volumeInfo.imageLinks?.thumbnail ?? fallbackImg}
					alt={data.volumeInfo.title}
				/>
			</div>

			<div className={cls.bookDataWrapper}>
				{data.volumeInfo.categories && (
					<div className={cls.categories}>
						{data.volumeInfo.categories.join(' / ')}
					</div>
				)}
				<div className={cls.titleBlock}>
					{data.volumeInfo.title && (
						<div className={cls.title}>Title: {data.volumeInfo.title}</div>
					)}
					{data.volumeInfo.subtitle && (
						<div className={cls.subtitle}>
							Subtitle: {data.volumeInfo.subtitle}
						</div>
					)}
					{data.volumeInfo.authors && (
						<div className={cls.authors}>
							Authors: {data.volumeInfo.authors.join(', ')}
						</div>
					)}
				</div>
				{data.volumeInfo.description && (
					<div className={cls.description}>
						<span>Description:</span>
						<div
							dangerouslySetInnerHTML={{ __html: data.volumeInfo.description }}
						></div>
					</div>
				)}
			</div>
		</div>
	);
});
