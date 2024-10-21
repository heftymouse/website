import { CONTINUE, EXIT, SKIP, visit } from 'unist-util-visit';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeSanitize from 'rehype-sanitize';
import rehypeStringify from 'rehype-stringify';
import { unified } from 'unified';
import type { Root, Element as HastElement } from 'hast';

// TODO: make callout (note, warn etc.) plugin

export async function renderPost(content: string, root: URL): Promise<string> {
	const rendered = await unified()
		.use(remarkParse)
		.use(remarkRehype)
		.use(makeLinksAbsolute, root)
		.use(addTitleAndCaption)
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
			if(node.tagName === 'img' && node.properties?.alt) {
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
				parent.children[index] = figure;
				console.log(parent)
			}
		})
	}
}