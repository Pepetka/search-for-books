import { ReactNode } from 'react';
import { render } from '@testing-library/react';
import { I18nextProvider } from 'react-i18next';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { StateSchema } from '@/app/providers/Store/types/StateSchema';
import { StoreProvider } from '@/app/providers/Store/ui/StoreProvider';
import { ThemeProvider } from '@/app/providers/Themes';
import i18nTest from '../../i18next/i18nextTest';

interface ComponentTestRenderOptions {
	route?: string;
	routeTemplate?: string;
	initialState?: DeepPartial<StateSchema>;
	withRoutes?: boolean;
}

export const componentTestRender = (
	component: ReactNode,
	options: ComponentTestRenderOptions = {}
) => {
	const {
		route = '/',
		initialState = {
			searchBooks: { _limit: 30, page: {} },
			scroll: { scroll: {} },
		},
		routeTemplate = route,
		withRoutes = true,
	} = options;

	return render(
		<MemoryRouter initialEntries={[route]}>
			<StoreProvider initialState={initialState as StateSchema}>
				<ThemeProvider>
					<I18nextProvider i18n={i18nTest}>
						{withRoutes ? (
							<Routes>
								<Route path={routeTemplate ?? '*'} element={component} />
							</Routes>
						) : (
							component
						)}
					</I18nextProvider>
				</ThemeProvider>
			</StoreProvider>
		</MemoryRouter>
	);
};
