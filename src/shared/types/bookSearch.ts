import { categoriesArray, sortMethodsArray } from '../const/bookSort';

type CategoryType = (typeof categoriesArray)[number];
type MethodType = (typeof sortMethodsArray)[number];

export interface SearchParams extends Record<string, string> {
	q: string;
	category: CategoryType;
	method: MethodType;
}
