export async function verifyChallenge(env: Env, token: string, ip: string): Promise<boolean> {
	if (env.NODE_ENV !== 'production') return true;

	let formData = new URLSearchParams();
	formData.append('secret', env.TURNSTILE_SECRET_KEY);
	formData.append('response', token);
	formData.append('remoteip', ip);
	const url = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';
	const result = await fetch(url, {
		body: formData.toString(),
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		method: 'POST'
	});

	const outcome = await result.json();
	console.log(JSON.stringify(outcome));
	return outcome.success;
}
