import { BrowserRouter } from 'react-router-dom';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '@/app/ui/App.tsx';
import { ThemeProvider } from '@/app/providers/Themes';
import { ErrorBoundary } from './app/providers/ErrorBoundary';
import { StoreProvider } from './app/providers/Store/ui/StoreProvider.tsx';
import './app/styles/index.scss';

const root = document.getElementById('root') as HTMLElement;

ReactDOM.createRoot(root).render(
	<React.StrictMode>
		<ErrorBoundary>
			<StoreProvider>
				<BrowserRouter>
					<ThemeProvider>
						<App />
					</ThemeProvider>
				</BrowserRouter>
			</StoreProvider>
		</ErrorBoundary>
	</React.StrictMode>
);
