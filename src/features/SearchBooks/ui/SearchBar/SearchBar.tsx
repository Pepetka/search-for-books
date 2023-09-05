import { memo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { SearchParams } from '@/shared/types/bookSearch';
import { getMainPagePath } from '@/shared/const/router';
import { useGetSearchParams } from '@/shared/hooks/useGetSearchParams';
import { defaultSearchParams } from '@/shared/const/bookSort';
import { ThemeSwitcher } from '@/widgets/ThemeSwitcher';
import { SearchForm } from '../SaerchForm/SearchForm';
import cls from './SearchBar.module.scss';

export const SearchBar = memo(() => {
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
			<ThemeSwitcher />
			<h1>Search for books</h1>
			<SearchForm
				initialSearchParams={initialSearchParams}
				onSubmit={onSubmit}
			/>
		</div>
	);
});
