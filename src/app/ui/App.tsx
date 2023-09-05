import { Page } from '@/shared/ui/Page';
import { SearchBar } from '@/features/SearchBooks/ui/SearchBar/SearchBar';
import { AppRouter } from '../providers/Router/ui/AppRouter/AppRouter';
import './App.scss';

function App() {
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
}

export default App;
