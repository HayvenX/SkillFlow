import js from '@eslint/js';
import globals from 'globals';
import { FlatCompat } from '@eslint/eslintrc';

const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
});

export default [
  js.configs.recommended,
  ...compat.extends('airbnb-base'),
  ...compat.extends('prettier'),
  {
    files: ['**/*.{js,mjs,cjs}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: globals.browser,
    },
    rules: {
      'no-new': 'off',
      'no-param-reassign': 'off',
      'no-unused-expressions': 'off',
      'no-promise-executor-return': 'off',
      'lines-between-class-members': 'off',
      'import/prefer-default-export': 'off',
      'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
    },
    settings: {
      'import/resolver': {
        alias: {
          map: [['@', './src']],
          extensions: ['.js', '.ts', '.vue', '.json'],
        },
      },
    },
  },
];
