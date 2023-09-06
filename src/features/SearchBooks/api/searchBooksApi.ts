import { rtkApi } from '@/shared/api/rtkApi';
import fallbackImg from '@/shared/assets/img/fallback.jpg';
import { SearchParams } from '@/shared/types/bookSearch';
import { IBook, IVolumeInfo } from '@/entities/Book/model/types/bookData';

interface ISearchBooksApiArgs {
	q: SearchParams['q'];
	category: SearchParams['category'];
	method: SearchParams['method'];
	page?: number;
	limit: number;
}

interface IResponse {
	totalItems: number;
	items: DeepRequired<IBook>[];
	endReached: boolean;
}

const fallbackVolumeInfo: DeepRequired<IVolumeInfo> = {
	authors: ['No data about authors'],
	categories: ['No data about categories'],
	subtitle: '',
	description: '',
	title: 'No data about title',
	imageLinks: {
		thumbnail: fallbackImg,
	},
};

export const searchBooksApi = rtkApi.injectEndpoints({
	endpoints: (build) => ({
		fetchBookListData: build.query<IResponse, ISearchBooksApiArgs>({
			query: ({ q, category, method, page = 1, limit }) => {
				const maxResults = limit;
				const startIndex = (page - 1) * maxResults;
				const query = `${q}+subject:${category !== 'all' ? category : ''}`;

				return {
					method: 'Get',
					url: '/',
					params: {
						startIndex,
						maxResults,
						q: query,
						orderBy: method,
					},
				};
			},
			transformResponse: (data: IResponse, _, args) => {
				const newDataItems =
					data.items?.map((item) => ({
						id: item.id,
						volumeInfo: { ...fallbackVolumeInfo, ...item.volumeInfo },
					})) ?? [];

				return {
					totalItems: data.totalItems,
					items: newDataItems,
					endReached: newDataItems.length < args.limit,
				};
			},
			serializeQueryArgs: ({ endpointName, queryArgs }) => {
				return (
					endpointName + queryArgs.method + queryArgs.category + queryArgs.q
				);
			},
			merge: (currentData, responseData) => {
				if (responseData.items?.length) {
					currentData.totalItems = responseData.totalItems;
					currentData.endReached = responseData.endReached;
					currentData.items.push(...responseData.items);
				}
			},
			forceRefetch: ({ currentArg, previousArg }) => {
				return currentArg?.page !== previousArg?.page;
			},
			keepUnusedDataFor: Infinity,
		}),
	}),
});

export const { useFetchBookListDataQuery } = searchBooksApi;
