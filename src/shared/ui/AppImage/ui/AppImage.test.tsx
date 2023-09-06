import '@testing-library/jest-dom';
import { screen, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { componentTestRender } from '@/shared/config/jest';
import { AppImage } from './AppImage';

describe('AppImage', () => {
	test('fulfilled', async () => {
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		global.Image = class {
			constructor() {
				setTimeout(() => {
					this.onload();
				});
			}

			private onload() {}
		};

		await act(() => componentTestRender(<AppImage src="img" />));

		await waitFor(() =>
			expect(screen.getByTestId('AppImage')).toBeInTheDocument()
		);
	});

	test('rejected', async () => {
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		global.Image = class {
			constructor() {
				setTimeout(() => {
					this.onerror();
				});
			}

			private onerror() {}
		};

		await act(() => componentTestRender(<AppImage src="img" />));

		await waitFor(() =>
			expect(screen.getByTestId('AppImage.error')).toBeInTheDocument()
		);
	});

	test('pending', async () => {
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		global.Image = class {
			constructor() {
				setTimeout(() => {
					this.onload();
				}, 1000);
			}

			private onload() {}
		};

		await act(() => componentTestRender(<AppImage src="img" />));

		await waitFor(() =>
			expect(screen.getByTestId('AppImage.loading')).toBeInTheDocument()
		);
	});
});
