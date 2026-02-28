export const prerender = false;

import type { APIContext } from 'astro';
import { createClient } from '@libsql/client';
import {
	verifyKey,
	InteractionType,
	InteractionResponseType,
	InteractionResponseFlags
} from 'discord-interactions';

// Application command types — not exported by discord-interactions
const ApplicationCommandType = { MESSAGE: 3 } as const;

export async function POST({ request, locals }: APIContext) {
	const env = locals.runtime.env;
	const signature = request.headers.get('X-Signature-Ed25519') ?? '';
	const timestamp = request.headers.get('X-Signature-Timestamp') ?? '';
	const body = await request.text();

	const isValid = await verifyKey(body, signature, timestamp, env.DISCORD_PUBLIC_KEY);
	if (!isValid) {
		return new Response('Invalid signature', { status: 401 });
	}

	const interaction = JSON.parse(body);

	if (interaction.type === InteractionType.PING) {
		return Response.json({ type: InteractionResponseType.PONG });
	}

	if (
		interaction.type === InteractionType.APPLICATION_COMMAND &&
		interaction.data.type === ApplicationCommandType.MESSAGE
	) {
		const messageId: string = interaction.data.target_id;
		const message = interaction.data.resolved.messages[messageId];
		const content: string = message.content;

		if (!content.trim()) {
			return Response.json({
				type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
				data: { content: 'That message has no text content.', flags: InteractionResponseFlags.EPHEMERAL }
			});
		}

		// CREATE TABLE canteen_log (message_id TEXT PRIMARY KEY, content TEXT)
		const turso = createClient({ url: env.TURSO_URI, authToken: env.TURSO_TOKEN });
		await turso.execute({
			sql: `INSERT INTO canteen_log (message_id, content) VALUES (?1, ?2)
			      ON CONFLICT(message_id) DO UPDATE SET content = excluded.content`,
			args: [messageId, content]
		});

		return Response.json({
			type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
			data: { content: 'Logged!', flags: InteractionResponseFlags.EPHEMERAL }
		});
	}

	return new Response('Unknown interaction type', { status: 400 });
}
