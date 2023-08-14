import {defineCollection, z} from 'astro:content';

const blogCollection = defineCollection({
    type: 'content',
    schema: ({image}) => z.object({
        title: z.string(),
        description: z.string().optional(),
        heroImage: image().optional()
    })
})

export const collections = {
    'blog': blogCollection
}