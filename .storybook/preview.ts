import type { Preview } from '@storybook/react';
import { initialize, mswLoader } from 'msw-storybook-addon';
import {StyleDecorator} from "../src/shared/config/storybook";

initialize({
	onUnhandledRequest: 'bypass'
});

const preview: Preview = {
	parameters: {
		actions: { argTypesRegex: '^on[A-Z].*' },
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/,
			},
		},
	},
	loaders: [mswLoader],
	decorators: [StyleDecorator],
};

export default preview;
