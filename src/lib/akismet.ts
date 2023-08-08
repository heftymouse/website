interface AkismetResponse {
	result: 'true' | 'false' | 'invalid'
	drop: boolean
}

export async function checkSpam(
	name: string,
	url: string,
	content: string,
	host: string,
	ip: string,
	userAgent: string
): Promise<AkismetResponse> {
	const params = new URLSearchParams([
		['api_key', import.meta.env.API_KEY],
		['blog', host],
		['user_ip', ip],
		['user_agent', userAgent],
		['comment_type', 'guestbook-entry'],
		['comment_author', name],
		['comment_author_url', url],
		['comment_content', content],
		['blog_lang', 'en'],
		['blog_charset', 'UTF-8'],
		['honeypot_field_name', 'poop']
	])

	const response = await fetch('https://akismet.com/developers/comment-check?', {
		method: 'POST',
		headers: {
			'Content-Type': 'x-www-form-urlencoded'
		},
		body: params.toString()
	})

	const body = await response.text()
	const drop = response.headers.get('X-akismet-pro-tip') === 'discard'
	return {
		result: body as AkismetResponse['result'],
		drop: drop
	}
}
