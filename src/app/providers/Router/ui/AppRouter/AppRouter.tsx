import { memo, Suspense, useCallback } from 'react';
import { Navigate, Route, RouteProps, Routes } from 'react-router-dom';
import { getMainPagePath } from '@/shared/const/router.ts';
import { routeConfig } from '../../routeConfig/routeConfig';

export const AppRouter = memo(() => {
	const renderWithWrapper = useCallback(({ path, element }: RouteProps) => {
		const routeElement = (
			<Suspense fallback={<h1>Loading...</h1>}>{element}</Suspense>
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
		<Routes>
			<Route path="/" element={<Navigate to={getMainPagePath()} replace />} />
			{Object.values(routeConfig).map(renderWithWrapper)}
		</Routes>
	);
});