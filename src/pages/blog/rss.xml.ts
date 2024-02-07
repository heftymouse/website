import type { APIContext } from 'astro';
import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { RSSFeedItem } from '@astrojs/rss';
import { renderPost } from '../../lib/markdown';

export async function GET(ctx: APIContext) {
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
				description: e.data.description,
				link: `/blog/${e.slug}`,
				content: await renderPost(e.body, ctx.site ?? new URL('https://heftymouse.me'))
			} as RSSFeedItem;
		})
	);

	return rss({
		xmlns: {
			atom: 'http://www.w3.org/2005/Atom'
		},
		title: 'heftymouse',
		description: "heftymouse's occasional musings.",
		site: ctx.site ?? 'https://heftymouse.me/blog',
		customData: `<atom:link href="${new URL('/blog/rss.xml', ctx.site)}" rel="self" type="application/rss+xml" />`,
		items: items
	});
}
