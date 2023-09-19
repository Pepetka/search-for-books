import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import fallbackImg from '@/shared/assets/img/fallback.webp';
import { Loader } from '@/shared/ui/Loader';
import { AppImage } from '@/shared/ui/AppImage';
import { useFetchBookItemDataQuery } from '../../api/bookDataApi';
import cls from './BookData.module.scss';

interface IBookDataProps {
	bookId: string;
}

export const BookData = memo((props: IBookDataProps) => {
	const { bookId } = props;
	const { t } = useTranslation();
	const { data, isError, isFetching } = useFetchBookItemDataQuery(
		{ bookId },
		{ refetchOnMountOrArgChange: true }
	);

	if (isFetching) {
		return (
			<div data-testid="BookData.loading" className={cls.BookData}>
				<Loader theme="invert" />
			</div>
		);
	}

	if (isError) {
		return (
			<div data-testid="BookData.error" className={cls.BookData}>
				<h2>{t('Something went wrong')}</h2>
			</div>
		);
	}

	if (!data) return;

	return (
		<div data-testid="BookData" className={cls.BookData}>
			<AppImage
				className={cls.imageWrapper}
				src={data.volumeInfo.imageLinks?.thumbnail ?? fallbackImg}
				alt={data.volumeInfo.title}
				theme="invert"
			/>

			<div className={cls.bookDataWrapper}>
				{data.volumeInfo.categories && (
					<div data-testid="BookData.categories" className={cls.categories}>
						{data.volumeInfo.categories.join(' / ')}
					</div>
				)}
				<div className={cls.titleBlock}>
					{data.volumeInfo.title && (
						<div data-testid="BookData.title" className={cls.title}>
							{t('Title')}: {data.volumeInfo.title}
						</div>
					)}
					{data.volumeInfo.subtitle && (
						<div data-testid="BookData.subtitle" className={cls.subtitle}>
							{t('Subtitle')}: {data.volumeInfo.subtitle}
						</div>
					)}
					{data.volumeInfo.authors && (
						<div data-testid="BookData.authors" className={cls.authors}>
							{t('Authors')}: {data.volumeInfo.authors.join(', ')}
						</div>
					)}
				</div>
				{data.volumeInfo.description && (
					<div data-testid="BookData.description" className={cls.description}>
						<span>{t('Description')}:</span>
						<div
							dangerouslySetInnerHTML={{ __html: data.volumeInfo.description }}
						></div>
					</div>
				)}
			</div>
		</div>
	);
});
