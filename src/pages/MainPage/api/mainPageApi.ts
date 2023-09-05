import { rtkApi } from '@/shared/api/rtkApi';
import fallbackImg from '@/shared/assets/img/fallback.jpg';
import { CategoryType, MethodType } from '@/shared/types/bookSearch';
import { IBook, IVolumeInfo } from '@/shared/types/book';

interface IMainPageApiArgs {
	q: string;
	category: CategoryType;
	method: MethodType;
	page?: number;
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

const maxResults = 30;

export const mainPageApi = rtkApi.injectEndpoints({
	endpoints: (build) => ({
		fetchBookListData: build.query<IResponse, IMainPageApiArgs>({
			query: ({ q, category, method, page = 1 }) => {
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
			transformResponse: (data: IResponse) => {
				const newDataItems =
					data.items?.map((item) => ({
						id: item.id,
						volumeInfo: { ...fallbackVolumeInfo, ...item.volumeInfo },
					})) ?? [];

				return {
					totalItems: data.totalItems,
					items: newDataItems,
					endReached: newDataItems.length < maxResults,
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
		}),
	}),
});

export const { useFetchBookListDataQuery } = mainPageApi;
