import { visit } from 'unist-util-visit';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeSanitize from 'rehype-sanitize';
import rehypeStringify from 'rehype-stringify';
import { unified } from 'unified';
import type { Root } from 'hast';

// TODO: make callout (note, warn etc.) plugin

export async function renderPost(content: string, root: URL): Promise<string> {
	const rendered = await unified()
		.use(remarkParse)
		.use(remarkRehype)
		.use(makeLinksAbsolute, root)
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
