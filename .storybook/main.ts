import type { StorybookConfig } from '@storybook/react-vite';
import { withoutVitePlugins } from "@storybook/builder-vite";

const config: StorybookConfig = {
	stories: ['../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
	addons: [
		'@storybook/addon-links',
		'@storybook/addon-essentials',
		'@storybook/addon-interactions',
	],
	framework: {
		name: '@storybook/react-vite',
		options: {},
	},
	viteFinal: async (config) => {
		return {
			...config,
			plugins: await withoutVitePlugins(config.plugins, ['vite-plugin-pwa', 'vite-plugin-pwa:info', 'vite-plugin-pwa:build', 'vite-plugin-pwa:dev-sw']),
		}
	},
	staticDirs: ['../public'],
	docs: {
		autodocs: 'tag',
	},
};
export default config;
