import { memo } from 'react';
import { Header } from '@/widgets/Header';
import { AppRouter } from '../providers/Router/ui/AppRouter/AppRouter';
import './App.scss';

const App = memo(() => {
	return (
		<div className="App">
			<Header />
			<AppRouter />
		</div>
	);
});

export default App;
