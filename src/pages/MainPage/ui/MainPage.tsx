import { memo, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { BookList } from '@/components/BookList';
import { useAppDispatch } from '@/shared/hooks/useAppDispatch';
import { mainPageActions } from '@/pages/MainPage/model/slice/mainPageSlice';
import { defaultSearchParams } from '@/shared/const/bookSort';
import { CategoryType, MethodType } from '@/shared/types/bookSearch';
import { useFetchBookListDataQuery } from '../api/mainPageApi';
import { getSearchPaginationPage } from '../model/selectors/mainPageSelectors';
import cls from './MainPage.module.scss';

const MainPage = memo(() => {
	const [searchParams, setSearchParams] = useSearchParams();
	const page = useSelector(getSearchPaginationPage);
	const dispatch = useAppDispatch();
	const { data, isLoading, isFetching, isError } = useFetchBookListDataQuery({
		page,
		...(searchParams.get('q') !== null
			? {
					q: searchParams.get('q') as string,
					category: searchParams.get('category') as CategoryType,
					method: searchParams.get('method') as MethodType,
			  }
			: defaultSearchParams),
	});

	const onLoadMore = () => {
		if (!data?.endReached) dispatch(mainPageActions.setPage());
	};

	useEffect(() => {
		if (searchParams.get('q') === null) {
			setSearchParams(defaultSearchParams);
		}
	}, [searchParams, setSearchParams]);

	if (isLoading) {
		return (
			<div className={cls.MainPage}>
				<h2>Loading...</h2>
			</div>
		);
	}

	if (isError) {
		return (
			<div className={cls.MainPage}>
				<h2>Something went wrong</h2>
			</div>
		);
	}

	return (
		<div className={cls.MainPage}>
			{data && <h2>Found {data.totalItems} results</h2>}
			{data && <BookList books={data.items} />}
			{!data?.endReached && (
				<button
					className={cls.button}
					onClick={onLoadMore}
					disabled={isFetching}
				>
					{isFetching ? 'Loading...' : 'Load more'}
				</button>
			)}
		</div>
	);
});

export default MainPage;
