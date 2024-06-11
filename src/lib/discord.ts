export async function postGuestbookWebhook(webhookUrl: string, name: string, url: string, message: string, timestamp: number, ip: string, country: string, ua: string) {
    const m = JSON.stringify({
        content: '<@684428788481917044> New guestbook message',
        embeds: [
            {
                type: 'rich',
                title: name,
                url: url,
                description: message,
                color: 0x36f38b,
                fields: [
                    {
                        name: `Sent at`,
                        value: `<t:${Math.floor(timestamp / 1000)}>`
                    },
                    {
                        name: 'IP Address',
                        value: `${ip} (${country})`
                    },
                    {
                        name: 'User Agent',
                        value: ua
                    }
                ]
            }
        ]
    });
    const res = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: m
    });
}