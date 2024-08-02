import { sveltekit } from '@sveltejs/kit/vite';
import { svelteTesting } from '@testing-library/svelte/vite';
import { readFile } from 'fs/promises';
import { defineConfig, type Plugin } from 'vitest/config';

const packageJson: Plugin = {
	name: 'packageJson',
	resolveId: {
		order: 'pre',
		handler(source, importer, options) {
			if (source === 'packagejson') {
				return source;
			}
			return null;
		},
	},
	load: {
		order: 'pre',
		async handler(id, options) {
			if (id === 'packagejson') {
				return `export default ${(await readFile('./package.json', { encoding: 'utf-8' }))}`;
			}
			return null;
		},
	}
};

export default defineConfig({
	plugins: [sveltekit(), packageJson, svelteTesting()],
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}', 'src/**/*.{test,spec}.svelte.{js,ts}'],
		environment: 'jsdom',
		globals: true
	}
});
