import { createSelector } from '@reduxjs/toolkit';
import { StateSchema } from '@/app/providers/Store/types/StateSchema';
import { MainPageSchema } from '../types/mainPageSchema.ts';

export const getSearchPaginationPage = createSelector(
	(state: StateSchema) => state.mainPage,
	(state: MainPageSchema) => state.page
);
