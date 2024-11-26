export default {
	plugins: {
		'postcss-import': {},
		tailwindcss: {},
		autoprefixer: {},
		...(process.env.PROD ? { cssnano: {} } : {})
	}
};
