import { ChangeEvent, FormEvent, memo, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { SearchParams } from '@/shared/types/bookSearch';
import {
	categoriesArray,
	defaultSearchParams,
	sortMethodsArray,
} from '@/shared/const/bookSort';
import SearchSvg from '@/shared/assets/svg/search.svg';
import cls from './SearchForm.module.scss';

interface ISearchFormProps {
	onSubmit?: (data: SearchParams) => void;
	initialSearchParams: SearchParams;
}

export const SearchForm = memo((props: ISearchFormProps) => {
	const { onSubmit, initialSearchParams } = props;
	const { t } = useTranslation();
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
		if (initialSearchParams.q !== defaultSearchParams.q) {
			setSearch(initialSearchParams.q);
		}
		if (initialSearchParams.category !== defaultSearchParams.category) {
			setSelectedCategory(initialSearchParams.category);
		}
		if (initialSearchParams.method !== defaultSearchParams.method) {
			setSelectedMethod(initialSearchParams.method);
		}
	}, [initialSearchParams]);

	return (
		<form
			data-testid="SearchForm"
			onSubmit={onSubmitHandle}
			className={cls.SearchForm}
		>
			<label>
				<input
					data-testid="SearchForm.search"
					placeholder={t('Search')}
					type="text"
					value={search}
					onChange={onSearch}
				/>
				<button
					data-testid="SearchForm.submit"
					aria-label="Search books"
					className={cls.searchButton}
					type="submit"
				>
					<SearchSvg />
				</button>
			</label>
			<div className={cls.selectGroup}>
				<label>
					<span>{t('Category')}</span>
					<select
						data-testid="SearchForm.category"
						value={selectedCategory}
						onChange={onSelectCategory}
					>
						{categoriesArray.map((category) => (
							<option key={category} value={category}>
								{t(category)}
							</option>
						))}
					</select>
				</label>
				<label>
					<span>{t('Sorting by')}</span>
					<select
						data-testid="SearchForm.method"
						value={selectedMethod}
						onChange={onSelectMethod}
					>
						{sortMethodsArray.map((method) => (
							<option key={method} value={method}>
								{t(method)}
							</option>
						))}
					</select>
				</label>
			</div>
		</form>
	);
});
