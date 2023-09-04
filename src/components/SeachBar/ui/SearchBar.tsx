import { memo } from 'react';
import { SearchForm } from '@/components/SearchForm';
import cls from './SearchBar.module.scss';

export const SearchBar = memo(() => {
	return (
		<div className={cls.SearchBar}>
			<h1>Search for books</h1>
			<SearchForm />
		</div>
	);
});
