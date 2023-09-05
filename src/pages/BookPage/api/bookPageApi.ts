import { rtkApi } from '@/shared/api/rtkApi.ts';
import { IBook } from '@/shared/types/book.ts';

interface IResponse extends IBook {}

interface IBookPageApiArgs {
	bookId: string;
}

export const bookPageApi = rtkApi.injectEndpoints({
	endpoints: (build) => ({
		fetchBookItemData: build.query<IResponse, IBookPageApiArgs>({
			query: ({ bookId }) => ({
				method: 'Get',
				url: `/${bookId}`,
			}),
		}),
	}),
});

export const { useFetchBookItemDataQuery } = bookPageApi;
