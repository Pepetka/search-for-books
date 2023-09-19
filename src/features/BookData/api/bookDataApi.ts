import { rtkApi } from '@/shared/api/rtkApi';
import { Book } from '@/entities/Book/model/types/bookData';

interface IResponse extends Book {}

interface IBookDaaApiArgs {
	bookId: string;
}

export const bookDataApi = rtkApi.injectEndpoints({
	endpoints: (build) => ({
		fetchBookItemData: build.query<IResponse, IBookDaaApiArgs>({
			query: ({ bookId }) => ({
				method: 'Get',
				url: `/${bookId}`,
				params: {
					apiKey: '',
				},
			}),
		}),
	}),
});

export const { useFetchBookItemDataQuery } = bookDataApi;
