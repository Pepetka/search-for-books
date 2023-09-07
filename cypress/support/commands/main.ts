export const interceptBookData = (error = false) => {
	const api = Cypress.env('api');

	return cy.intercept(`${api}/testId*`, {
		statusCode: error ? 404 : 200,
		fixture: 'bookData.json',
	});
};

export const interceptSearchData = (
	type: 'default' | 'category' | 'query' | 'big' = 'default',
	options: {
		query?: string;
		error?: boolean;
	} = {}
) => {
	const api = Cypress.env('api');
	let fixture;
	let template;

	switch (type) {
		case 'query':
			fixture = 'searchBooksSearch.json';
			template = `*q=${options.query}+subject:&*`;
			break;
		case 'category':
			fixture = 'searchBooksArt.json';
			template = '*q=+subject:art&*';
			break;
		case 'big':
			fixture = 'searchBooksBig.json';
			template = '*q=+subject:&*';
			break;
		default:
			fixture = 'searchBooks.json';
			template = '*q=+subject:&*';
	}

	return cy.intercept(`${api}${template}`, {
		statusCode: options.error ? 404 : 200,
		fixture,
	});
};

export const testBookData = () => {
	cy.getByTestId('BookData.title').contains('Test Title');
	cy.getByTestId('BookData.categories').contains('art / biography');
	cy.getByTestId('BookData.subtitle').contains('Test Subtitle');
	cy.getByTestId('BookData.authors').contains('Some Author 1, Some Author 2');
	cy.getByTestId('BookData.description').contains('Test description');
};

export const testSearchData = (
	total: number,
	loadmore: 'exist' | 'not.exist'
) => {
	cy.getByTestId('SearchBooks').should('exist');
	cy.getByTestId('SearchBooks.total').contains(`${total}`).should('exist');
	cy.getByTestId('SearchBooks.loadmore').should(loadmore);
};

export const waitResponse = (name: string, alias: string) => {
	cy.getByTestId(`${name}.loading`).should('exist');
	cy.wait(`@${alias}`);
};

declare global {
	namespace Cypress {
		interface Chainable {
			interceptBookData(error?: boolean): Chainable<void>;
			interceptSearchData(
				type?: 'default' | 'category' | 'query' | 'big',
				options?: {
					query?: string;
					error?: boolean;
				}
			): Chainable<void>;
			testBookData(): Chainable<void>;
			testSearchData(
				total: number,
				loadmore: 'exist' | 'not.exist'
			): Chainable<void>;
			waitResponse(name: string, alias: string): Chainable<void>;
		}
	}
}
