import { rtkApi } from '@/shared/api/rtkApi';
import { SearchBooksSchema } from '@/features/SearchBooks';

export interface StateSchema {
	searchBooks: SearchBooksSchema;
	[rtkApi.reducerPath]: ReturnType<typeof rtkApi.reducer>;
}
