import { createSelector } from '@reduxjs/toolkit';
import { StateSchema } from '@/app/providers/Store/types/StateSchema';
import { ScrollSchema } from '../../types/scrollSchema';

export const getScroll = (path: string) =>
	createSelector(
		(state: StateSchema) => state.scroll,
		(state: ScrollSchema) => state.scroll[path] ?? 0
	);
