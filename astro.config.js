import { defineConfig, squooshImageService } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';
import cloudflare from '@astrojs/cloudflare';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
	site: 'https://heftymouse.me',
	output: 'hybrid',
	integrations: [
		tailwind({
			applyBaseStyles: false
		}),
		mdx(),
		sitemap()
	],
	markdown: {
		shikiConfig: {
			theme: 'github-dark'
		}
	},
	adapter: cloudflare(),
	vite: {
		ssr: {
			noExternal: ['path-to-regexp']
		}
	}
});
