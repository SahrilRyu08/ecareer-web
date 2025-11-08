import react from 'eslint-plugin-react';
import hooks from 'eslint-plugin-react-hooks';
import ts from '@typescript-eslint/eslint-plugin';
import parser from '@typescript-eslint/parser';


export default [
    { files: ['**/*.{ts,tsx}'], languageOptions: { parser }, plugins: { react, hooks, ts }, rules: {
            'react-refresh/only-export-components': 'off'
        }}
];