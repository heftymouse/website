import { defineCollection, z } from 'astro:content';

const blogCollection = defineCollection({
	type: 'content',
	schema: z.object({
		title: z.string(),
		description: z.string().optional(),
		date: z.coerce.date(),
		heroImage: z.string().optional()
	})
});

export const collections = {
	blog: blogCollection,
	updates: blogCollection
};
