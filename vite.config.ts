import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';
import { GenerateSWOptions } from 'workbox-build/src/types';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';

const getCache = ({
	name,
	pattern,
}: {
	name: string;
	pattern: RegExp;
}): GenerateSWOptions['runtimeCaching'][number] => ({
	urlPattern: pattern,
	handler: 'NetworkFirst',
	options: {
		cacheName: name,
		expiration: {
			maxEntries: 500,
			maxAgeSeconds: 60 * 60 * 24, // 1 day
		},
		cacheableResponse: {
			statuses: [200],
		},
	},
});

export default defineConfig(({ mode }) => {
	const env = loadEnv(mode, process.cwd(), '');

	return {
		plugins: [
			react(),
			VitePWA({
				registerType: 'autoUpdate',
				workbox: {
					globPatterns: ['**/*.{js,css,html,ico,png,webp,svg,json,txt,woff2}'],
					runtimeCaching: [
						getCache({
							name: 'main-request-cache',
							pattern:
								/^https:\/\/www.googleapis.com\/books\/v1\/volumes\?startIndex=0.+/,
						}),
					],
				},
			}),
			svgr({
				exportAsDefault: true,
			}),
		],
		resolve: {
			alias: {
				'@': path.resolve(__dirname, 'src'),
			},
		},
		server: {
			host: true,
			port: 5173,
			watch: {
				usePolling: true,
			},
		},
		preview: {
			host: true,
			port: 8080,
		},
		define: {
			__API__: JSON.stringify(env.VITE_API),
			__API_KEY__: JSON.stringify(env.VITE_API_KEY),
		},
	};
});
