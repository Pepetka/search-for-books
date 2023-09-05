import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ScrollSchema } from '../types/scrollSchema';

const initialState: ScrollSchema = {
	scroll: {},
};

export const scrollSlice = createSlice({
	name: 'scroll',
	initialState,
	reducers: {
		setScroll: (
			state,
			action: PayloadAction<{ path: string; position: number }>
		) => {
			const { path, position } = action.payload;

			state.scroll[path] = position;
		},
	},
});

export const { actions: scrollActions, reducer: scrollReducer } = scrollSlice;
