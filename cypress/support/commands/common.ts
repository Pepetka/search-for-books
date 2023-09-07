import { selectByTestId } from '../../helpers/selectByTestId';

export const getByTestId = (
	testId: string,
	options?: Parameters<typeof cy.get>[1]
) => cy.get(selectByTestId(testId), options);

export const visitPage = (name: string, path: string) => {
	cy.visit(path);
	cy.getByTestId(name, { timeout: 3000 }).should('exist');
};

declare global {
	namespace Cypress {
		interface Chainable {
			getByTestId(
				testId: string,
				options?: Parameters<typeof cy.get>[1]
			): Chainable<HTMLElement>;
			visitPage(name: string, path: string): Chainable<void>;
		}
	}
}
