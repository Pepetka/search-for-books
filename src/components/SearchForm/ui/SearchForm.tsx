import { ChangeEvent, FormEvent, memo, useState } from 'react';
import SearchSvg from '@/shared/assets/search.svg';
import cls from './SearchForm.module.scss';

const categoriesArray = [
	'all',
	'art',
	'biography',
	'computers',
	'history',
	'medical',
	'poetry',
] as const;

const sortMethodsArray = ['relevance', 'newest'] as const;

export const SearchForm = memo(() => {
	const [search, setSearch] = useState('');
	const [selectedCategory, setSelectedCategory] =
		useState<(typeof categoriesArray)[number]>('all');
	const [selectedMethod, setSelectedMethod] =
		useState<(typeof sortMethodsArray)[number]>('relevance');

	const onSearch = (event: ChangeEvent<HTMLInputElement>) => {
		setSearch(event.target.value);
	};

	const onSelectCategory = (event: ChangeEvent<HTMLSelectElement>) => {
		setSelectedCategory(event.target.value as (typeof categoriesArray)[number]);
	};

	const onSelectMethod = (event: ChangeEvent<HTMLSelectElement>) => {
		setSelectedMethod(event.target.value as (typeof sortMethodsArray)[number]);
	};

	const onSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		console.log(
			`search: ${search}; category: ${selectedCategory}; method: ${selectedMethod}`
		);
	};

	return (
		<form onSubmit={onSubmit} className={cls.SearchForm}>
			<label>
				<input
					placeholder="Search"
					type="text"
					value={search}
					onChange={onSearch}
				/>
				<button className={cls.searchButton}>
					<SearchSvg />
				</button>
			</label>
			<div className={cls.selectGroup}>
				<label>
					Categories
					<select value={selectedCategory} onChange={onSelectCategory}>
						{categoriesArray.map((category) => (
							<option key={category} value={category}>
								{category}
							</option>
						))}
					</select>
				</label>
				<label>
					Sorting by
					<select value={selectedMethod} onChange={onSelectMethod}>
						{sortMethodsArray.map((method) => (
							<option key={method} value={method}>
								{method}
							</option>
						))}
					</select>
				</label>
			</div>
		</form>
	);
});
