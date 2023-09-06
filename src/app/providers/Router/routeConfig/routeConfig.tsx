import { RouteProps } from 'react-router-dom';
import {
	AppRoutes,
	getBookPagePath,
	getMainPagePath,
} from '@/shared/const/router';
import { NotFoundPage } from '@/pages/NotFoundPage';
import { MainPage } from '@/pages/MainPage';
import { BookPage } from '@/pages/BookPage';

export const routeConfig: Record<AppRoutes, RouteProps> = {
	[AppRoutes.MAIN]: {
		path: getMainPagePath(),
		element: <MainPage />,
	},
	[AppRoutes.BOOK_PAGE]: {
		path: getBookPagePath(':bookId'),
		element: <BookPage />,
	},
	[AppRoutes.NOT_FOUND]: {
		path: '/*',
		element: <NotFoundPage />,
	},
};
