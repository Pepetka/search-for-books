import { memo } from 'react';
import { Page } from '@/widgets/Page';
import { SearchBar } from '@/features/SearchBooks';
import { AppRouter } from '../providers/Router/ui/AppRouter/AppRouter';
import './App.scss';

const App = memo(() => {
	return (
		<div className="App">
			<header>
				<SearchBar />
			</header>
			<Page>
				<AppRouter />
			</Page>
		</div>
	);
});

export default App;
