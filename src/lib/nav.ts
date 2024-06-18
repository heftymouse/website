export type Routes = 'Home' | 'Info' | 'Projects' | 'Guestbook' | 'Blog';

export const links: Record<Routes, string> = {
	Home: '/',
	Info: '/info',
	Projects: '/projects',
	Blog: '/blog',
	Guestbook: '/guestbook'
	// "Other": "/other"
};
