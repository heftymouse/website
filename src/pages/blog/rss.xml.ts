import type { APIContext } from 'astro';
import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { renderPost } from '../../lib/markdown';

export async function get(ctx: APIContext) {
	const collection = (await getCollection('blog')).sort((a, b) => {
		const d1 = a.data.date;
		const d2 = b.data.date;
		if (d1 < d2) return 1;
		else if (d1 > d2) return -1;
		else return 0;
	});

	const items = await Promise.all(
		collection.map(async (e) => {
			return {
				title: e.data.title,
				pubDate: e.data.date,
				link: `/blog/${e.slug}`,
				content: await renderPost(e.body)
			};
		})
	);

	return rss({
		title: 'heftymouse',
		description: "heftymouse's occasional musings.",
		site: ctx.site ?? 'https://heftymouse.me/blog',
		items: items
	});
}
