
module.exports = {
    purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            colors: {
                "light-blue": "#51C4D3",
                "custom-gray": "#D8E3E7",
                "dark-blue": "#126E82",
                "dark-green": "#132C33",
            }
        },
    },
    variants: {
        extend: {

        },
    },
    plugins: [],
}
