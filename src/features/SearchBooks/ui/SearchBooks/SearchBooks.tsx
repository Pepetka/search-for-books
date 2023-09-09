import { memo, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useAppDispatch } from '@/shared/hooks/useAppDispatch';
import { SearchParams } from '@/shared/types/bookSearch';
import { BookList } from '@/entities/Book';
import { Loader } from '@/shared/ui/Loader';
import {
	getSearchPaginationLimit,
	getSearchPaginationPage,
} from '../../model/selectors/searchBooksSelectors';
import { useFetchBookListDataQuery } from '../../api/searchBooksApi';
import { searchBooksActions } from '../../model/slice/searchBooksSlice';
import cls from './SearchBooks.module.scss';

interface ISearchBooksProps {
	searchParams: SearchParams;
}

export const SearchBooks = memo((props: ISearchBooksProps) => {
	const { searchParams } = props;
	const { t } = useTranslation();
	const page = useSelector(getSearchPaginationPage(searchParams));
	const limit = useSelector(getSearchPaginationLimit);
	const dispatch = useAppDispatch();
	const { data, isFetching, isError } = useFetchBookListDataQuery({
		page,
		limit,
		...searchParams,
	});

	const onLoadMore = () => {
		if (!data?.endReached) {
			dispatch(searchBooksActions.setPage({ searchParams }));
		}
	};

	useEffect(() => {
		dispatch(searchBooksActions.initPage({ searchParams }));
	}, [dispatch, searchParams]);

	if (isFetching && page === 1) {
		return (
			<div data-testid="SearchBooks.loading" className={cls.SearchBooks}>
				<Loader theme="invert" />
			</div>
		);
	}

	if (isError) {
		return (
			<div data-testid="SearchBooks.error" className={cls.SearchBooks}>
				<h2>{t('Something went wrong')}</h2>
			</div>
		);
	}

	return (
		<div data-testid="SearchBooks" className={cls.SearchBooks}>
			{data && (
				<h2 data-testid="SearchBooks.total">
					{t('Found')} {data.totalItems}
				</h2>
			)}
			{data && <BookList books={data.items} />}
			{!data?.endReached && (
				<button
					data-testid="SearchBooks.loadmore"
					className={cls.button}
					onClick={onLoadMore}
					disabled={isFetching}
				>
					{isFetching ? t('Loading') : t('Load more')}
				</button>
			)}
		</div>
	);
});
