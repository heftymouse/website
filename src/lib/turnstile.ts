export async function verifyChallenge(token: string, ip: string): Promise<boolean> {
    let formData = new FormData();
	formData.append('secret', import.meta.env.TURNSTILE_SECRET_KEY);
	formData.append('response', token);
	formData.append('remoteip', ip);

    const url = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';
	const result = await fetch(url, {
		body: formData,
		method: 'POST',
	});

	const outcome = await result.json();
	return outcome.success;
}