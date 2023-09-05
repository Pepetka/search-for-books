import { SearchParams } from '../types/bookSearch';

export const categoriesArray = [
	'all',
	'art',
	'biography',
	'computers',
	'history',
	'medical',
	'poetry',
] as const;

export const sortMethodsArray = ['relevance', 'newest'] as const;

export const defaultSearchParams: SearchParams = {
	q: '',
	category: 'all',
	method: 'relevance',
};
