import { sveltekit } from '@sveltejs/kit/vite';
import { svelteTesting } from '@testing-library/svelte/vite';
import { readFile } from 'fs/promises';
import { defineConfig, type Plugin } from 'vitest/config';

function packagePluginFactory(file: 'pkg' | 'pkg-lock'): Plugin {
	const pluginName = file === 'pkg' ? 'packageJson' : 'packageLockJson';
	const fileName = file === 'pkg' ? 'package.json' : 'package-lock.json';
	return {
		name: pluginName,
		resolveId: {
			order: 'pre',
			handler(source, importer, options) {
				if (source === pluginName) {
					return source;
				}
				return null;
			},
		},
		load: {
			order: 'pre',
			async handler(id, options) {
				if (id === pluginName) {
					return `export default ${(await readFile(`./${fileName}`, { encoding: 'utf-8' }))}`;
				}
				return null;
			},
		}
	};
}

export default defineConfig({
	plugins: [sveltekit(), packagePluginFactory('pkg'), packagePluginFactory('pkg-lock'), svelteTesting()],
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}', 'src/**/*.{test,spec}.svelte.{js,ts}'],
		environment: 'jsdom',
		globals: true
	}
});
