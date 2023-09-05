import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MainPageSchema } from '../types/mainPageSchema';

const initialState: MainPageSchema = {
	page: 1,
};

export const mainPageSlice = createSlice({
	name: 'mainPage',
	initialState,
	reducers: {
		setPage: (state, { payload }: PayloadAction<number | undefined>) => {
			state.page = payload ?? state.page + 1;
		},
	},
});

export const { actions: mainPageActions, reducer: mainPageReducer } =
	mainPageSlice;
