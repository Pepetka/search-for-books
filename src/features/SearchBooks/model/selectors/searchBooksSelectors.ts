import { createSelector } from '@reduxjs/toolkit';
import { StateSchema } from '@/app/providers/Store/types/StateSchema';
import { SearchBooksSchema } from '../types/searchBooksSchema.ts';

export const getSearchPaginationPage = createSelector(
	(state: StateSchema) => state.searchBooks,
	(state: SearchBooksSchema) => state.page
);
