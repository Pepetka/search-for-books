import { configureStore, ReducersMapObject } from '@reduxjs/toolkit';
import { rtkApi } from '@/shared/api/rtkApi';
import { searchBooksReducer } from '@/features/SearchBooks';
import { scrollReducer } from '@/widgets/Page';
import { StateSchema } from './types/StateSchema';

export const createReduxStore = (initialState?: StateSchema) => {
	const rootReducer: ReducersMapObject<StateSchema> = {
		searchBooks: searchBooksReducer,
		scroll: scrollReducer,
		[rtkApi.reducerPath]: rtkApi.reducer,
	};

	const store = configureStore({
		reducer: rootReducer,
		preloadedState: initialState,
		middleware: (getDefaultMiddleware) =>
			getDefaultMiddleware().concat(rtkApi.middleware),
	});

	return store;
};
