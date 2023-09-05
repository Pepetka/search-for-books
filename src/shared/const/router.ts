export enum AppRoutes {
	MAIN = 'Main',
	BOOK_PAGE = 'Book page',
	NOT_FOUND = 'NotFound',
}

export const getMainPagePath = (searchParams?: string) => {
	return `/books${searchParams ? `?${searchParams}` : ''}`;
};
export const getBookPagePath = (id: string) => {
	return `/books/item/${id}`;
};
