export async function verifyChallenge(secret: string, token: string, ip: string): Promise<boolean> {
    let formData = new URLSearchParams();
	formData.append('secret', secret);
	formData.append('response', token);
	formData.append('remoteip', ip);
    const url = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';
	const result = await fetch(url, {
		body: formData.toString(),
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		method: 'POST',
	});

	const outcome = await result.json();
	console.log(JSON.stringify(outcome));
	return outcome.success;
}