import { visitPage } from '../../support/commands/common';
import { getBookPagePath } from '../../../src/shared/const/router';

describe('search books', () => {
	describe('fulfilled', () => {
		beforeEach(() => {
			cy.interceptBookData().as('testData');
		});

		it('book data', () => {
			visitPage('BookPage', getBookPagePath('testId'));
			cy.waitResponse('BookData', 'testData');

			cy.testBookData();
		});
	});

	describe('rejected', () => {
		beforeEach(() => {
			cy.interceptBookData(true).as('testData');
		});

		it('error', () => {
			visitPage('BookPage', getBookPagePath('testId'));
			cy.waitResponse('BookData', 'testData');

			cy.getByTestId('BookData.error').should('exist');
		});
	});
});
