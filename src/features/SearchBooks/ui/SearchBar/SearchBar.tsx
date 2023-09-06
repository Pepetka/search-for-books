import { memo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { SearchParams } from '@/shared/types/bookSearch';
import { getMainPagePath } from '@/shared/const/router';
import { useGetSearchParams } from '@/shared/hooks/useGetSearchParams';
import { defaultSearchParams } from '@/shared/const/bookSort';
import { SearchForm } from '../SaerchForm/SearchForm';
import cls from './SearchBar.module.scss';

export const SearchBar = memo(() => {
	const { t } = useTranslation();
	const navigate = useNavigate();
	const [initialSearchParams] = useGetSearchParams(defaultSearchParams);

	const onSubmit = useCallback(
		(data: SearchParams) => {
			const searchParams = new URLSearchParams(data);

			navigate(getMainPagePath(searchParams.toString()));
		},
		[navigate]
	);

	return (
		<div className={cls.SearchBar}>
			<h1>{t('Search for books')}</h1>
			<SearchForm
				initialSearchParams={initialSearchParams}
				onSubmit={onSubmit}
			/>
		</div>
	);
});
