import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';

export default defineConfig(({ mode }) => {
	const env = loadEnv(mode, process.cwd(), '');

	return {
		plugins: [
			react(),
			VitePWA({
				registerType: 'autoUpdate',
				workbox: {
					globPatterns: ['**/*.{js,css,html,ico,png,svg,json,txt,woff2}'],
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
