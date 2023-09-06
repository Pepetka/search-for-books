import '@testing-library/jest-dom';
import { screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { componentTestRender } from '@/shared/config/jest';
import { ErrorBoundary } from './ErrorBoundary';

const ErrorTest = () => {
	throw new Error();
};

describe('ErrorBoundary', () => {
	test('be in the document', async () => {
		await act(() =>
			componentTestRender(<ErrorBoundary children={<ErrorTest />} />)
		);

		expect(screen.getByTestId('PageError')).toBeInTheDocument();
	});
});
