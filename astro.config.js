import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import cloudflare from '@astrojs/cloudflare';
import sitemap from '@astrojs/sitemap';
import { addTitleAndCaption } from './src/lib/markdown';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
	site: 'https://heftymouse.me',
	integrations: [
		mdx(),
		sitemap()
	],
	markdown: {
		shikiConfig: {
			theme: 'dark-plus'
		},
		rehypePlugins: [addTitleAndCaption]
	},
	vite: {
		build: {
			rollupOptions: {
				output: {
					hashCharacters: 'hex'
				}
			}
		},
		plugins: [
			tailwindcss()
		],
		ssr: {
			external: ['node:fs/promises', 'node:path', '@node-rs/xxhash'],
		}
	},
	adapter: cloudflare({
		imageService: 'compile'
	})
});
