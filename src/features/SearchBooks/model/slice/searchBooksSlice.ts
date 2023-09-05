import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SearchParams } from '@/shared/types/bookSearch.ts';
import { SearchBooksSchema } from '../types/searchBooksSchema.ts';

const initialState: SearchBooksSchema = {
	page: {},
	_limit: 30,
};

export const searchBooksSlice = createSlice({
	name: 'searchBooks',
	initialState,
	reducers: {
		setPage: (
			state,
			{ payload }: PayloadAction<{ page?: number; searchParams: SearchParams }>
		) => {
			const searchParams = new URLSearchParams(payload.searchParams).toString();

			state.page[searchParams] =
				payload.page ?? (state.page[searchParams] ?? 0) + 1;
		},
		initPage: (
			state,
			{ payload }: PayloadAction<{ searchParams: SearchParams }>
		) => {
			const searchParams = new URLSearchParams(payload.searchParams).toString();

			state.page[searchParams] = state.page[searchParams] ?? 1;
		},
	},
});

export const { actions: searchBooksActions, reducer: searchBooksReducer } =
	searchBooksSlice;
