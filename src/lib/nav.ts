export type Routes = 'Home' | 'About' | 'Projects' | 'Guestbook' | 'Blog';

export const links: Record<Routes, string> = {
	Home: '/',
	About: '/about',
	Projects: '/projects',
	Blog: '/blog',
	Guestbook: '/guestbook'
	// "Other": "/other"
};
