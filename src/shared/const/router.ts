export enum AppRoutes {
	MAIN = 'Main',
	BOOK_PAGE = 'Book page',
	NOT_FOUND = 'NotFound',
}

export const getMainPagePath = () => {
	return '/books';
};
export const getBookPagePath = (id: string) => {
	return `/books/${id}`;
};
