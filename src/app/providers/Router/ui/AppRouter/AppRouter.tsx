import { memo, Suspense, useCallback } from 'react';
import { Navigate, Route, RouteProps, Routes } from 'react-router-dom';
import { getMainPagePath } from '@/shared/const/router';
import { PageLoader } from '@/widgets/PageLoader';
import { Page } from '@/widgets/Page';
import { RouteConfig, routeConfig } from '../../routeConfig/routeConfig';

export const AppRouter = memo(
	({ config = routeConfig }: { config?: RouteConfig }) => {
		const renderWithWrapper = useCallback(({ path, element }: RouteProps) => {
			const routeElement = (
				<Suspense fallback={<PageLoader theme="invert" />}>{element}</Suspense>
			);

			return (
				<Route
					key={path}
					path={path}
					element={
						path === '/' ? (
							<Navigate to={getMainPagePath()} replace />
						) : (
							routeElement
						)
					}
				/>
			);
		}, []);

		return (
			<Page>
				<Routes>
					<Route
						path="/"
						element={<Navigate to={getMainPagePath()} replace />}
					/>
					{Object.values(config).map(renderWithWrapper)}
				</Routes>
			</Page>
		);
	}
);
