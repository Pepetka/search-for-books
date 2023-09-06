import '@testing-library/jest-dom';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import { componentTestRender } from '@/shared/config/jest';
import { getMainPagePath } from '@/shared/const/router.ts';
import { defaultSearchParams } from '@/shared/const/bookSort.ts';
import { SearchParams } from '@/shared/types/bookSearch.ts';
import { SearchBar } from './SearchBar';

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
	...jest.requireActual('react-router-dom'),
	useNavigate: () => mockNavigate,
}));

describe('SearchBar', () => {
	test('relocate default', async () => {
		await act(() => componentTestRender(<SearchBar />));

		const user = userEvent.setup();
		await user.type(screen.getByTestId('SearchForm.search'), '{enter}');

		const urlSearchParams = new URLSearchParams(defaultSearchParams).toString();

		expect(mockNavigate).toHaveBeenNthCalledWith(
			1,
			getMainPagePath(urlSearchParams)
		);
	});

	test('relocate with params', async () => {
		const targetParams: SearchParams = {
			q: 'some query',
			category: 'history',
			method: 'newest',
		};
		await act(() => componentTestRender(<SearchBar />));

		const user = userEvent.setup();
		await user.selectOptions(
			screen.getByTestId('SearchForm.category'),
			targetParams.category
		);
		await user.selectOptions(
			screen.getByTestId('SearchForm.method'),
			targetParams.method
		);
		await user.type(
			screen.getByTestId('SearchForm.search'),
			`${targetParams.q}{enter}`
		);

		const urlSearchParams = new URLSearchParams(targetParams).toString();

		expect(mockNavigate).toHaveBeenNthCalledWith(
			1,
			getMainPagePath(urlSearchParams)
		);
	});
});
