import { rtkApi } from '@/shared/api/rtkApi';
import { SearchBooksSchema } from '@/features/SearchBooks';
import { ScrollSchema } from '@/widgets/Page';

export interface StateSchema {
	searchBooks: SearchBooksSchema;
	scroll: ScrollSchema;
	[rtkApi.reducerPath]: ReturnType<typeof rtkApi.reducer>;
}
