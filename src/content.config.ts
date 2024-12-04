import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blogCollection = (path: string) => defineCollection({
	loader: glob({ pattern: '**\/[^_]*.md', base: `./src/content/${path}` }),
	schema: z.object({
		title: z.string(),
		description: z.string().optional(),
		date: z.coerce.date(),
		heroImage: z.string().optional()
	})
});

export const collections = {
	blog: blogCollection('blog'),
	updates: blogCollection('updates')
};
