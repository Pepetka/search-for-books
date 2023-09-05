import { rtkApi } from '@/shared/api/rtkApi';
import { MainPageSchema } from '@/pages/MainPage';

export interface StateSchema {
	mainPage: MainPageSchema;
	[rtkApi.reducerPath]: ReturnType<typeof rtkApi.reducer>;
}
