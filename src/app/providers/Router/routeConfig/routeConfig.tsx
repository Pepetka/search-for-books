import { RouteProps } from 'react-router-dom';
import {
	AppRoutes,
	getBookPagePath,
	getMainPagePath,
} from '@/shared/const/router';
import { NotFoundPage } from '@/pages/NoteFoundPage';
import { MainPage } from '@/pages/MainPage';

export const routeConfig: Record<AppRoutes, RouteProps> = {
	[AppRoutes.MAIN]: {
		path: getMainPagePath(),
		element: <MainPage />,
	},
	[AppRoutes.BOOK_PAGE]: {
		path: getBookPagePath(':id'),
		element: <MainPage />,
	},
	[AppRoutes.NOT_FOUND]: {
		path: '/*',
		element: <NotFoundPage />,
	},
};
