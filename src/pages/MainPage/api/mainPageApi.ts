import { rtkApi } from '@/shared/api/rtkApi';
import fallbackImg from '@/shared/assets/fallback.jpg';

interface IMainPageApiArgs {
	q: string;
	page?: number;
}

interface IVolumeInfo {
	title: string;
	authors: string[];
	imageLinks: {
		smallThumbnail: string;
		thumbnail: string;
	};
	categories: string[];
}

export interface IBook {
	id: string;
	volumeInfo: IVolumeInfo;
}

interface IResponse {
	totalItems: number;
	items: IBook[];
}

const fallbackVolumeInfo: IVolumeInfo = {
	authors: ['No data about authors'],
	categories: ['No data about categories'],
	title: 'No data about title',
	imageLinks: {
		thumbnail: fallbackImg,
		smallThumbnail: fallbackImg,
	},
};

export const mainPageApi = rtkApi.injectEndpoints({
	endpoints: (build) => ({
		fetchData: build.query<IResponse, IMainPageApiArgs>({
			query: ({ q, page = 1 }) => {
				const maxResults = 30;
				const startIndex = (page - 1) * maxResults;

				return {
					method: 'Get',
					url: '/v1/volumes',
					params: {
						startIndex,
						maxResults,
						q: `${q}subject:`,
					},
				};
			},
			transformResponse: (data: IResponse) => {
				const newDataItems = data.items.map((item) => ({
					id: item.id,
					volumeInfo: { ...fallbackVolumeInfo, ...item.volumeInfo },
				}));

				return { totalItems: data.totalItems, items: newDataItems };
			},
		}),
	}),
});

export const { useLazyFetchDataQuery } = mainPageApi;
