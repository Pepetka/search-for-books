import { createSelector } from '@reduxjs/toolkit';
import { StateSchema } from '@/app/providers/Store/types/StateSchema';
import { SearchParams } from '@/shared/types/bookSearch';
import { SearchBooksSchema } from '../types/searchBooksSchema';

export const getSearchPaginationPage = (searchParams: SearchParams) => {
	const searchParamString = new URLSearchParams(searchParams).toString();

	return createSelector(
		(state: StateSchema) => state.searchBooks,
		(state: SearchBooksSchema) => state.page[searchParamString] ?? 1
	);
};

export const getSearchPaginationLimit = createSelector(
	(state: StateSchema) => state.searchBooks,
	(state: SearchBooksSchema) => state._limit
);
