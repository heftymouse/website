module.exports = {
    plugins: {
        'postcss-import': {},
        tailwindcss: {},
        autoprefixer: {},
        ...(import.meta.env.MODE === 'production' ? { cssnano: {} } : {})
    }
};