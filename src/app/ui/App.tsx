import { SearchBar } from '@/components/SeachBar';
import { AppRouter } from '../providers/Router/ui/AppRouter/AppRouter';
import './App.scss';

function App() {
	return (
		<>
			<SearchBar />
			<main className="App">
				<AppRouter />
			</main>
		</>
	);
}

export default App;
