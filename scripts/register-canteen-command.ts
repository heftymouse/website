const appId = process.env.DISCORD_APP_ID;
const token = process.env.DISCORD_BOT_TOKEN;

if (!appId || !token) {
	console.error('Missing DISCORD_APP_ID or DISCORD_BOT_TOKEN environment variables.');
	process.exit(1);
}

const endpoint = `https://discord.com/api/v10/applications/${appId}/commands`;

const command = {
	name: 'Log to canteen',
	type: 3 // MESSAGE context menu command
};

const res = await fetch(endpoint, {
	method: 'POST',
	headers: {
		Authorization: `Bot ${token}`,
		'Content-Type': 'application/json'
	},
	body: JSON.stringify(command)
});

if (res.ok) {
	const data = await res.json();
	console.log(`Command registered globally (id: ${data.id})`);
} else {
	const err = await res.text();
	console.error(`Failed to register command (${res.status}):`, err);
	process.exit(1);
}

export {}