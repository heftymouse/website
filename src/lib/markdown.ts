import { CONTINUE, EXIT, SKIP, visit } from 'unist-util-visit';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeSanitize from 'rehype-sanitize';
import rehypeStringify from 'rehype-stringify';
import { unified } from 'unified';
import type { Root, Element as HastElement } from 'hast';
import fs from 'node:fs/promises'
import path from 'node:path';
import { xxh3 } from '@node-rs/xxhash';

// TODO: make callout (note, warn etc.) plugin

export async function renderPost(content: string, root: URL, collection: string, slug: string) {
	const rendered = await unified()
		.use(remarkParse)
		.use(remarkRehype)
		.use(makeLinksAbsolute, root)
		.use(addTitleAndCaption)
		.use(fixImages, collection, slug)
		.use(rehypeSanitize)
		.use(rehypeStringify)
		.process(content);

	return String(rendered);
}

function makeLinksAbsolute(root: URL) {
	return (tree: Root) => {
		visit(tree, 'element', (node) => {
			if (node.tagName === 'a' && node.properties?.href) {
				const href = node.properties.href as string;
				if (!href.startsWith('/')) return;
				node.properties.href = new URL(href, root).toString();
			}
		});
	};
}

export function addTitleAndCaption() {
	return (tree: Root) => {
		visit(tree, 'element', (node, index, parent) => {
			if (node.tagName === 'img' && node.properties?.alt) {
				const altText = node.properties.alt as string;
				node.properties.title = altText;
				const figure: HastElement = {
					tagName: 'figure',
					type: 'element',
					properties: {},
					children: [
						node,
						{
							tagName: 'figcaption',
							type: 'element',
							properties: {},
							children: [
								{
									type: 'text',
									value: altText
								}
							]
						}
					]
				};
				(parent as HastElement).tagName = 'div';
				parent!.children[index!] = figure;
			}
		})
	}
}

function fixImages(collection: string, slug: string) {
	return async (tree: Root) => {
		const imgs: HastElement[] = [];

		visit(tree, 'element', (node) => {
			if (node.tagName === 'img' && node.properties?.src) {
				imgs.push(node);
			}
		});

		await Promise.all(imgs.map(async e => {
			const filePath = `./src/content/${collection}/${slug}/${e.properties.src}`;
			const parsedPath = path.parse(filePath);

			const data = await fs.readFile(filePath) as unknown as Uint8Array;
			let hash = xxh3.xxh128(data).toString(16).match(/.{2}/g)!.reverse().join(''); // weird way to turn it into little endian

			e.properties.src = `/_astro/${parsedPath.name}.${hash.slice(0, 8)}${parsedPath.ext}`;
		}))
	};
}