import { memo, useCallback, useMemo } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { SearchForm } from '@/components/SearchForm';
import {
	CategoryType,
	MethodType,
	SearchParams,
} from '@/shared/types/bookSearch';
import { getMainPagePath } from '@/shared/const/router';
import { useAppDispatch } from '@/shared/hooks/useAppDispatch.ts';
import { mainPageActions } from '@/pages/MainPage/model/slice/mainPageSlice.ts';
import cls from './SearchBar.module.scss';

export const SearchBar = memo(() => {
	const navigate = useNavigate();
	const [searchParams] = useSearchParams();
	const dispatch = useAppDispatch();

	const initialSearchParams: SearchParams | undefined = useMemo(() => {
		if (searchParams.get('q') === null) {
			return undefined;
		}

		return {
			q: searchParams.get('q') as string,
			category: searchParams.get('category') as CategoryType,
			method: searchParams.get('method') as MethodType,
		};
	}, [searchParams]);

	const onSubmit = useCallback(
		(data: SearchParams) => {
			const searchParams = new URLSearchParams(data);
			dispatch(mainPageActions.setPage(1));

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
