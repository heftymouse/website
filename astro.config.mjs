import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';
import cloudflare from '@astrojs/cloudflare';

// https://astro.build/config
export default defineConfig({
	output: 'hybrid',
	integrations: [
		tailwind({
			applyBaseStyles: false
		}),
		mdx()
	],
	adapter: cloudflare(),
	vite: {
		ssr: {
			noExternal: ['path-to-regexp']
		}
	}
});
