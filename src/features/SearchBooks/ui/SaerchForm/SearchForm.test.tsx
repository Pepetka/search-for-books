import '@testing-library/jest-dom';
import { screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import { componentTestRender } from '@/shared/config/jest';
import { defaultSearchParams } from '@/shared/const/bookSort.ts';
import { SearchParams } from '@/shared/types/bookSearch.ts';
import { SearchForm } from './SearchForm';

describe('SearchForm', () => {
	test('test search default', async () => {
		let testSearchParams: SearchParams | undefined;
		const targetParams = defaultSearchParams;

		await act(() =>
			componentTestRender(
				<SearchForm
					initialSearchParams={defaultSearchParams}
					onSubmit={(data) => (testSearchParams = data)}
				/>
			)
		);

		const user = userEvent.setup();
		await user.type(screen.getByTestId('SearchForm.search'), '{enter}');

		expect(testSearchParams).toEqual(targetParams);
	});

	test('test search data', async () => {
		let testSearchParams: SearchParams | undefined;
		const targetParams: SearchParams = {
			q: 'some query',
			method: 'newest',
			category: 'history',
		};

		await act(() =>
			componentTestRender(
				<SearchForm
					initialSearchParams={defaultSearchParams}
					onSubmit={(data) => (testSearchParams = data)}
				/>
			)
		);

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

		expect(testSearchParams).toEqual(targetParams);
	});
});
