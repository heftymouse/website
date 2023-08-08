import type { APIRoute } from 'astro'

export const prerender = false

export const post: APIRoute = async ({ request }) => {
	const data = await request.formData()
	console.dir(data)
	return new Response(null, { status: 200 })
}
