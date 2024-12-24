import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';
import cloudflare from '@astrojs/cloudflare';
import sitemap from '@astrojs/sitemap';
import { addTitleAndCaption } from './src/lib/markdown';

// https://astro.build/config
export default defineConfig({
	site: 'https://heftymouse.me',
	integrations: [
		tailwind({
			applyBaseStyles: false
		}),
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
		ssr: {
			external: ['node:fs/promises', 'node:path', '@node-rs/xxhash'],
		}
	},
	adapter: cloudflare({
		imageService: 'compile'
	})
});
