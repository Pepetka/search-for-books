import { memo, useEffect, useState } from 'react';
import { BookList } from '@/components/BookList';
import { IBook, useLazyFetchDataQuery } from '../api/mainPageApi.ts';
import cls from './MainPage.module.scss';

const MainPage = memo(() => {
	const [onFetch, { data, isLoading, isFetching, isError }] =
		useLazyFetchDataQuery();
	const [page, setPage] = useState(2);
	const [books, setBooks] = useState<IBook[]>([]);

	useEffect(() => {
		if (!books.length) {
			onFetch({
				page: 1,
				q: '',
			});
		}
		// eslint-disable-next-line
	}, []);

	useEffect(() => {
		if (data?.items) {
			setBooks((prev) => [...prev, ...data.items]);
		}
	}, [data]);

	const onLoadMore = () => {
		onFetch({
			page,
			q: '',
		});

		setPage((prev) => prev + 1);
	};

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
			{data && <BookList books={books} />}
			<button className={cls.button} onClick={onLoadMore} disabled={isFetching}>
				{isFetching ? 'Loading...' : 'Load more...'}
			</button>
		</div>
	);
});

export default MainPage;
