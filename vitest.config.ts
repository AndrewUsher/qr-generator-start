import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import { resolve } from 'node:path'

export default defineConfig({
	// @ts-expect-error - Known issue with Vite and Vitest type compatibility
	plugins: [react()],
	test: {
		environment: 'jsdom',
		globals: true,
		setupFiles: ['./vitest.setup.ts'],
		alias: {
			'@': resolve(__dirname, './app'),
		},
	},
})
