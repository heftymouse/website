export const links = {
	// Home: '/',
	Info: '/info',
	Projects: '/projects',
	Blog: '/blog',
	Guestbook: '/guestbook'
	// "Other": "/other"
} as const;

export type Routes = keyof typeof links