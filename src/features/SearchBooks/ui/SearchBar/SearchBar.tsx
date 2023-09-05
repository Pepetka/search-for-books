import { memo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { SearchParams } from '@/shared/types/bookSearch';
import { getMainPagePath } from '@/shared/const/router';
import { useAppDispatch } from '@/shared/hooks/useAppDispatch';
import { useGetSearchParams } from '@/shared/hooks/useGetSearchParams';
import { defaultSearchParams } from '@/shared/const/bookSort';
import { SearchForm } from '../SaerchForm/SearchForm';
import { searchBooksActions } from '../../model/slice/searchBooksSlice';
import cls from './SearchBar.module.scss';

export const SearchBar = memo(() => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const [initialSearchParams] = useGetSearchParams(defaultSearchParams);

	const onSubmit = useCallback(
		(data: SearchParams) => {
			const searchParams = new URLSearchParams(data);
			dispatch(searchBooksActions.setPage(1));

			navigate(getMainPagePath(searchParams.toString()));
		},
		[dispatch, navigate]
	);

	return (
		<div className={cls.SearchBar}>
			<h1>Search for books</h1>
			<SearchForm
				initialSearchParams={initialSearchParams}
				onSubmit={onSubmit}
			/>
		</div>
	);
});
