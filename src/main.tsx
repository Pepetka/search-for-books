import { BrowserRouter } from 'react-router-dom';
import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import App from '@/app/ui/App';
import { PageLoader } from '@/widgets/PageLoader';
import { ThemeProvider } from '@/app/providers/Themes';
import { ErrorBoundary } from './app/providers/ErrorBoundary';
import { StoreProvider } from './app/providers/Store/ui/StoreProvider';
import './app/styles/index.scss';
import '@/shared/config/i18next/i18next';

const root = document.getElementById('root') as HTMLElement;

ReactDOM.createRoot(root).render(
	<React.StrictMode>
		<ErrorBoundary>
			<StoreProvider>
				<BrowserRouter>
					<ThemeProvider>
						<Suspense fallback={<PageLoader />}>
							<App />
						</Suspense>
					</ThemeProvider>
				</BrowserRouter>
			</StoreProvider>
		</ErrorBoundary>
	</React.StrictMode>
);
