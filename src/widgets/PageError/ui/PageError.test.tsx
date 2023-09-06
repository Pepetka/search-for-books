import '@testing-library/jest-dom';
import { screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import { componentTestRender } from '@/shared/config/jest';
import { PageError } from './PageError';

const mockReload = jest.fn();
const original = window.location;

describe('PageError', () => {
	beforeAll(() => {
		Object.defineProperty(window, 'location', {
			configurable: true,
			value: { reload: mockReload },
		});
	});

	afterAll(() => {
		Object.defineProperty(window, 'location', {
			configurable: true,
			value: original,
		});
	});

	test('test reload page', async () => {
		await act(() => componentTestRender(<PageError />));

		const user = userEvent.setup();

		expect(screen.getByTestId('PageError')).toBeInTheDocument();

		await user.click(screen.getByTestId('PageError.button'));
		expect(mockReload).toHaveBeenNthCalledWith(1);
	});
});
