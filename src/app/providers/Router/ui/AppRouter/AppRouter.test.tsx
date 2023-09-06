import '@testing-library/jest-dom';
import { screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { componentTestRender } from '@/shared/config/jest';
import {
	AppRoutes,
	getBookPagePath,
	getMainPagePath,
} from '@/shared/const/router';
import { RouteConfig } from '../../routeConfig/routeConfig';
import { AppRouter } from './AppRouter';

window.scrollTo = jest.fn();

const TestMain = () => {
	return <div data-testid="AppRouter.main" />;
};
const TestBook = () => {
	return <div data-testid="AppRouter.book" />;
};
const TestNotFound = () => {
	return <div data-testid="AppRouter.notFound" />;
};

const testConfig: RouteConfig = {
	[AppRoutes.MAIN]: {
		path: getMainPagePath(),
		element: <TestMain />,
	},
	[AppRoutes.BOOK_PAGE]: {
		path: getBookPagePath(':bookId'),
		element: <TestBook />,
	},
	[AppRoutes.NOT_FOUND]: {
		path: '/*',
		element: <TestNotFound />,
	},
};

describe('AppRouter', () => {
	test('visit main', async () => {
		await act(() =>
			componentTestRender(<AppRouter config={testConfig} />, {
				withRoutes: false,
				route: getMainPagePath(),
			})
		);

		expect(screen.getByTestId('AppRouter.main')).toBeInTheDocument();
	});

	test('visit book', async () => {
		await act(() =>
			componentTestRender(<AppRouter config={testConfig} />, {
				withRoutes: false,
				route: getBookPagePath('some id'),
			})
		);

		expect(screen.getByTestId('AppRouter.book')).toBeInTheDocument();
	});

	test('visit not found', async () => {
		await act(() =>
			componentTestRender(<AppRouter config={testConfig} />, {
				withRoutes: false,
				route: '/randomPath',
			})
		);

		expect(screen.getByTestId('AppRouter.notFound')).toBeInTheDocument();
	});

	test('visit /, relocate to main', async () => {
		await act(() =>
			componentTestRender(<AppRouter config={testConfig} />, {
				withRoutes: false,
				route: '/',
			})
		);

		expect(screen.getByTestId('AppRouter.main')).toBeInTheDocument();
	});
});
