import type { APIContext } from 'astro';
import rss from '@astrojs/rss';
import { getCollection, type ContentEntryMap } from 'astro:content';
import type { RSSFeedItem } from '@astrojs/rss';
import { renderPost } from '../../lib/markdown';

export async function GET(ctx: APIContext) {
	const items = (await createItems(ctx, 'blog'))
		.concat(await createItems(ctx, 'updates'))
		.sort((a, b) => b.pubDate!.getTime() - a.pubDate!.getTime());

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

async function createItems(ctx: APIContext, name: keyof ContentEntryMap): Promise<RSSFeedItem[]> {
	const collection = await getCollection(name);

	const items = await Promise.all(
		collection.map(async (e) => {
			return {
				title: e.data.title,
				pubDate: e.data.date,
				description: e.data.description,
				link: `/${name}/${e.slug}`,
				content: await renderPost(e.body, ctx.site ?? new URL('https://heftymouse.me'), name, e.slug)
			} as RSSFeedItem;
		})
	);

	return items;
}
