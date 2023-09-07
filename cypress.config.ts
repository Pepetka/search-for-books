import { defineConfig } from 'cypress';
import dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
	projectId: 'agz6b8',
	e2e: {
		baseUrl: 'http://localhost:5173',
		setupNodeEvents(_, config) {
			config.env.api = process.env.VITE_API;

			return config;
		},
	},
});
