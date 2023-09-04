import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const rtkApi = createApi({
	reducerPath: 'rtkApi',
	baseQuery: fetchBaseQuery({
		baseUrl: __API__,
		paramsSerializer: (params) => {
			const searchParams = new URLSearchParams(params);
			searchParams.append('key', __API_KEY__);

			return decodeURIComponent(searchParams.toString());
		},
	}),
	refetchOnReconnect: true,
	endpoints: () => ({}),
});
