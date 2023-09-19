import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { Decorator } from '@storybook/react';

export const getRouterDecorator =
	({
		withRoutes = true,
		initialEntry = '/',
		template = '',
	}: {
		withRoutes?: boolean;
		initialEntry?: string;
		template?: string;
	} = {}): Decorator =>
	(StoryComponent) => {
		return (
			<MemoryRouter initialEntries={[initialEntry]}>
				{withRoutes ? (
					<Routes>
						<Route
							path={template ?? initialEntry}
							element={<StoryComponent />}
						/>
					</Routes>
				) : (
					<StoryComponent />
				)}
			</MemoryRouter>
		);
	};
