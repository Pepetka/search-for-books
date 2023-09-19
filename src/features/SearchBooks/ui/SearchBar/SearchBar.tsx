import { memo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { SearchParams } from '@/shared/types/bookSearch';
import { getMainPagePath } from '@/shared/const/router';
import { useGetSearchParams } from '@/shared/hooks/useGetSearchParams';
import { defaultSearchParams } from '@/shared/const/bookSort';
import { useParallaxTilt } from '@/shared/hooks/useParallaxTilt.ts';
import { classNames } from '@/shared/helpers/classNames/classNames.ts';
import { SearchForm } from '../SaerchForm/SearchForm';
import cls from './SearchBar.module.scss';

export const SearchBar = memo(() => {
	const { t } = useTranslation();
	const navigate = useNavigate();
	const [initialSearchParams] = useGetSearchParams(defaultSearchParams);
	const { parallaxClasses, cardRef, onMouseMove, onMouseLeave } =
		useParallaxTilt(true);

	const onSubmit = useCallback(
		(data: SearchParams) => {
			const searchParams = new URLSearchParams(data);

			navigate(getMainPagePath(searchParams.toString()));
		},
		[navigate]
	);

	return (
		<div
			onMouseMove={onMouseMove}
			onMouseLeave={onMouseLeave}
			ref={cardRef}
			className={cls.SearchBar}
		>
			<div className={classNames([cls.bgImage, parallaxClasses.parallaxTilt])}>
				<div className={parallaxClasses.layer1}>
					<h1>{t('Search for books')}</h1>
				</div>
				<div className={parallaxClasses.layer2}>
					<SearchForm
						initialSearchParams={initialSearchParams}
						onSubmit={onSubmit}
					/>
				</div>
			</div>
		</div>
	);
});
