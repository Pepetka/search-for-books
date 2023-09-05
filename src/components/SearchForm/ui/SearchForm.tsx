import { ChangeEvent, FormEvent, memo, useEffect, useState } from 'react';
import SearchSvg from '@/shared/assets/svg/search.svg';
import {
	categoriesArray,
	defaultSearchParams,
	sortMethodsArray,
} from '@/shared/const/bookSort';
import { SearchParams } from '@/shared/types/bookSearch';
import cls from './SearchForm.module.scss';

interface ISearchFormProps {
	onSubmit?: (data: SearchParams) => void;
	initialSearchParams?: SearchParams;
}

export const SearchForm = memo((props: ISearchFormProps) => {
	const { onSubmit, initialSearchParams = defaultSearchParams } = props;
	const [search, setSearch] = useState(initialSearchParams.q);
	const [selectedCategory, setSelectedCategory] = useState(
		initialSearchParams.category
	);
	const [selectedMethod, setSelectedMethod] = useState(
		initialSearchParams.method
	);

	const onSearch = (event: ChangeEvent<HTMLInputElement>) => {
		setSearch(event.target.value);
	};

	const onSelectCategory = (event: ChangeEvent<HTMLSelectElement>) => {
		setSelectedCategory(event.target.value as (typeof categoriesArray)[number]);
	};

	const onSelectMethod = (event: ChangeEvent<HTMLSelectElement>) => {
		setSelectedMethod(event.target.value as (typeof sortMethodsArray)[number]);
	};

	const onSubmitHandle = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		onSubmit?.({
			q: search,
			category: selectedCategory,
			method: selectedMethod,
		});
	};

	useEffect(() => {
		if (initialSearchParams !== defaultSearchParams) {
			setSearch(initialSearchParams.q);
			setSelectedCategory(initialSearchParams.category);
			setSelectedMethod(initialSearchParams.method);
		}
	}, [initialSearchParams]);

	return (
		<form onSubmit={onSubmitHandle} className={cls.SearchForm}>
			<label>
				<input
					placeholder="Search"
					type="text"
					value={search}
					onChange={onSearch}
				/>
				<button className={cls.searchButton} type="submit">
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
