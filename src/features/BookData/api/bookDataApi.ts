import { rtkApi } from '@/shared/api/rtkApi';
import { IBook } from '@/entities/Book/model/types/bookData';

interface IResponse extends IBook {}

interface IBookDaaApiArgs {
	bookId: string;
}

export const bookDataApi = rtkApi.injectEndpoints({
	endpoints: (build) => ({
		fetchBookItemData: build.query<IResponse, IBookDaaApiArgs>({
			query: ({ bookId }) => ({
				method: 'Get',
				url: `/${bookId}`,
			}),
		}),
	}),
});

export const { useFetchBookItemDataQuery } = bookDataApi;
