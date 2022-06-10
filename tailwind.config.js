const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
    content: ['./src/**/*.{html,js}', './node_modules/tw-elements/dist/js/**/*.js'],
    plugins: [
        require('tw-elements/dist/plugin')
    ],
    purge: ['./src/**/*.{js,ts,jsx,tsx}'],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter var', ...defaultTheme.fontFamily.sans],
            },
            height: {
                lg: '30rem',
                xl:'34rem',
                big:'44rem',
            },
            boxShadow:{
                "3xl":'0 35px 60px -15px rgba(0, 0, 0, 0.3)'
            },
        },
        variants: {
            extend: {},
        },
        plugins: [],
    }
}
