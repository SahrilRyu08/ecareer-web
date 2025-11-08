import type { Config } from 'tailwindcss';
export default {
    darkMode: ['class'],
    content: ['./index.html', './src/**/*.{ts,tsx}'],
    theme: {
        extend: {
            colors: {
                bg: '#0b0b0c',
                fg: '#e9e9ec',
                muted: '#9aa0a6',
                card: '#141416',
                border: '#26272b',
                accent: '#79a7ff'
            },
            borderRadius: { '2xl': '1rem' }
        }
    },
    plugins: []
} satisfies Config;