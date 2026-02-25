/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

interface Env {
	NODE_ENV: 'production' | 'development' | null;
	WEBHOOK_URL: string;
	TURNSTILE_SECRET_KEY: string;
	TURSO_URI: string;
	TURSO_TOKEN: string;
	DB: D1Database;
	DISCORD_APP_ID: string;
	DISCORD_PUBLIC_KEY: string;
	DISCORD_BOT_TOKEN: string;
}

type Runtime = import('@astrojs/cloudflare').Runtime<Env>;

declare namespace App {
	interface Locals extends Runtime {}
}
