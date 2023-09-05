import { categoriesArray, sortMethodsArray } from '../const/bookSort';

export type CategoryType = (typeof categoriesArray)[number];
export type MethodType = (typeof sortMethodsArray)[number];

export interface SearchParams extends Record<string, string> {
	q: string;
	category: CategoryType;
	method: MethodType;
}
