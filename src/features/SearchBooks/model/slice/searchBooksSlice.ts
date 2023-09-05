import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SearchBooksSchema } from '../types/searchBooksSchema.ts';

const initialState: SearchBooksSchema = {
	page: 1,
};

export const searchBooksSlice = createSlice({
	name: 'searchBooks',
	initialState,
	reducers: {
		setPage: (state, { payload }: PayloadAction<number | undefined>) => {
			state.page = payload ?? state.page + 1;
		},
	},
});

export const { actions: searchBooksActions, reducer: searchBooksReducer } =
	searchBooksSlice;
