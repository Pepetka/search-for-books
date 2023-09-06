import '@testing-library/jest-dom';
import { screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import { componentTestRender } from '@/shared/config/jest';
import { ThemeSwitcher } from './ThemeSwitcher';

describe('ThemeSwitcher', () => {
	test('switch theme', async () => {
		await act(() => componentTestRender(<ThemeSwitcher />));

		expect(screen.getByTestId('ThemeSwitcher')).toBeInTheDocument();

		expect(screen.getByTestId('ThemeSwitcher.button')).toHaveTextContent(
			'Light'
		);

		const user = userEvent.setup();
		await user.click(screen.getByTestId('ThemeSwitcher.button'));

		expect(screen.getByTestId('ThemeSwitcher.button')).toHaveTextContent(
			'Dark'
		);
	});
});
