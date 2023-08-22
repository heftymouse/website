import { remark } from 'remark';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeSanitize from 'rehype-sanitize';
import rehypeStringify from 'rehype-stringify';

// TODO: make callout (note, warn etc.) plugin

export async function renderPost(content: string): Promise<string> {
	const rendered = await remark()
		.use(remarkParse)
		.use(remarkRehype)
		.use(rehypeSanitize)
		.use(rehypeStringify)
		.process(content);

	return String(rendered);
}
