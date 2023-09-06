import '@testing-library/jest-dom';
import { screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import { componentTestRender } from '@/shared/config/jest';
import { LangSwitcher } from './LangSwitcher';

describe('LangSwitcher', () => {
	test('switch lang', async () => {
		await act(() => componentTestRender(<LangSwitcher />));

		expect(screen.getByTestId('LangSwitcher')).toBeInTheDocument();

		expect(screen.getByTestId('LangSwitcher.button')).toHaveTextContent('En');

		const user = userEvent.setup();
		await user.click(screen.getByTestId('LangSwitcher.button'));

		expect(screen.getByTestId('LangSwitcher.button')).toHaveTextContent('Ru');
	});
});
