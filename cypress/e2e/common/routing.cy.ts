import {
	getBookPagePath,
	getMainPagePath,
} from '../../../src/shared/const/router';

describe('routing', () => {
	beforeEach(() => {
		const api = Cypress.env('api');
		cy.intercept(`${api}*q=+subject:&*`, { fixture: 'searchBooks.json' }).as(
			'testSearchData'
		);
		cy.intercept(`${api}/testId*`, { fixture: 'bookData.json' }).as('testData');
	});

	it('main page', () => {
		cy.visitPage('MainPage', getMainPagePath());
		cy.wait('@testSearchData');
	});

	it('book page', () => {
		cy.visitPage('BookPage', getBookPagePath('testId'));
		cy.wait('@testData');
	});

	it('not found page', () => {
		cy.visitPage('NotFoundPage', '/random');
	});
});
