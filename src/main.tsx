import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '@/app/App';
import { ErrorBoundary } from '@/app/providers/ErrorBoundary';
import './index.css';

const root = document.getElementById('root') as HTMLElement;

ReactDOM.createRoot(root).render(
	<React.StrictMode>
		<ErrorBoundary>
			<App />
		</ErrorBoundary>
	</React.StrictMode>
);
