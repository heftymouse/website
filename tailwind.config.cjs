/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			borderRadius: {
				control: '4px',
				surface: '8px'
			},
			colors: {
				background: 'var(--background)',
				text: 'CanvasText',
				'accent-fill': 'var(--accentFill)',
				'accent-text': 'var(--accentText)',
				'card-fill': 'var(--cardFill)',
				'card-stroke': 'var(--cardStroke)',
				'divider-stroke': 'var(--dividerStroke)',
				'control-fill': 'var(--controlFill)',
				'control-stroke': 'var(--controlStroke)',
			},
			fontSize: {
				caption: ['0.85rem', '1rem'],
				body: ['1rem', '1.62rem'],
				h6: ['1.15rem', { lineHeight: '1.75rem', fontWeight: 600 }],
				h5: ['1.25rem', { lineHeight: '1.5rem', fontWeight: 600 }],
				h4: ['1.5rem', { lineHeight: '2rem', fontWeight: 600 }],
				h3: ['1.75rem', { lineHeight: '2.25rem', fontWeight: 600 }],
				h2: ['2rem', { lineHeight: '3.25rem', fontWeight: 600 }],
				h1: ['2.5rem', { lineHeight: '3.25rem', fontWeight: 600 }]
			}
		}
	},
	plugins: []
};
