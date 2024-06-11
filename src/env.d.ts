/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

interface Env {
  WEBHOOK_URL: string;
  TURNSTILE_SECRET_KEY: string;
	DB: D1Database;
}

type Runtime = import('@astrojs/cloudflare').Runtime<Env>;

declare namespace App {
  interface Locals extends Runtime {}
}