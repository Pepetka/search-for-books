import { visitPage } from '../../support/commands/common';
import { getMainPagePath } from '../../../src/shared/const/router';

describe('search books', () => {
	describe('fulfilled', () => {
		describe('small data', () => {
			beforeEach(() => {
				cy.interceptSearchData().as('defaultTestSearchData');
			});

			it('default', () => {
				visitPage('MainPage', getMainPagePath());
				cy.waitResponse('SearchBooks', 'defaultTestSearchData');

				cy.testSearchData(4, 'not.exist');
			});

			it('search by query', () => {
				cy.interceptSearchData('query', { query: 'searchData' }).as(
					'testSearchData'
				);

				visitPage('MainPage', getMainPagePath());
				cy.waitResponse('SearchBooks', 'defaultTestSearchData');

				cy.getByTestId('SearchForm.search').type('searchData{enter}');
				cy.wait('@testSearchData');

				cy.testSearchData(1, 'not.exist');
			});

			it('filtered by art', () => {
				cy.interceptSearchData('category').as('testSearchData');

				visitPage('MainPage', getMainPagePath());
				cy.waitResponse('SearchBooks', 'defaultTestSearchData');

				cy.getByTestId('SearchForm.category').select('art');
				cy.getByTestId('SearchForm.submit').click();
				cy.wait('@testSearchData');

				cy.testSearchData(2, 'not.exist');
			});
		});

		describe('big data', () => {
			beforeEach(() => {
				cy.interceptSearchData('big').as('testSearchData');
			});

			it('default', () => {
				visitPage('MainPage', getMainPagePath());
				cy.waitResponse('SearchBooks', 'testSearchData');

				cy.testSearchData(30, 'exist');
			});
		});
	});

	describe('rejected', () => {
		beforeEach(() => {
			cy.interceptSearchData('default', { error: true }).as('testSearchData');
		});

		it('error', () => {
			visitPage('MainPage', getMainPagePath());
			cy.waitResponse('SearchBooks', 'testSearchData');

			cy.getByTestId('SearchBooks.error').should('exist');
		});
	});
});
