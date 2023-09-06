import { memo } from 'react';
import fallbackImg from '@/shared/assets/img/fallback.jpg';
import { Loader } from '@/shared/ui/Loader';
import { AppImage } from '@/shared/ui/AppImage';
import { useFetchBookItemDataQuery } from '../../api/bookDataApi';
import cls from './BookData.module.scss';

interface IBookDataProps {
	bookId: string;
}

export const BookData = memo((props: IBookDataProps) => {
	const { bookId } = props;
	const { data, isError, isFetching } = useFetchBookItemDataQuery(
		{ bookId },
		{ refetchOnMountOrArgChange: true }
	);

	if (isFetching) {
		return (
			<div className={cls.BookData}>
				<Loader theme="invert" />
			</div>
		);
	}

	if (isError) {
		return (
			<div className={cls.BookData}>
				<h2>Something went wrong</h2>
			</div>
		);
	}

	return (
		<div className={cls.BookData}>
			<AppImage
				className={cls.imageWrapper}
				src={data.volumeInfo.imageLinks?.thumbnail ?? fallbackImg}
				alt={data.volumeInfo.title}
				theme="invert"
			/>

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
