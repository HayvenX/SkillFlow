import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import importPlugin from 'eslint-plugin-import';
import reactPlugin from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import prettier from 'eslint-config-prettier';

export default [
  js.configs.recommended,
  ...tseslint.configs.recommended,

  {
    files: ['**/*.{js,jsx,ts,tsx}'],

    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: globals.browser,
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
    },

    plugins: {
      import: importPlugin,
      react: reactPlugin,
      'react-hooks': reactHooks,
    },

    rules: {
      /* ---------------- AIRBNB-LIKE BASE ---------------- */

      // vars
      'no-unused-vars': 'warn',
      'no-use-before-define': 'off',

      // style
      'no-console': 'warn',
      'no-debugger': 'warn',

      // functions
      'arrow-body-style': ['error', 'as-needed'],
      'prefer-arrow-callback': 'error',

      // classes
      'class-methods-use-this': 'off',

      // import
      'import/no-unresolved': 'off',
      'import/extensions': 'off',
      'import/prefer-default-export': 'off',
      'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
      'import/order': [
        'error',
        {
          groups: [
            'builtin',
            'external',
            'internal',
            ['parent', 'sibling', 'index'],
          ],
          'newlines-between': 'always',
        },
      ],

      /* ---------------- REACT ---------------- */

      'react/react-in-jsx-scope': 'off', // for new JSX
      'react/jsx-filename-extension': [
        'warn',
        { extensions: ['.jsx', '.tsx'] },
      ],
      'react/prop-types': 'off', // TS is in use
      'react/function-component-definition': [
        'error',
        {
          namedComponents: 'arrow-function',
        },
      ],

      /* ---------------- HOOKS ---------------- */

      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',

      /* ---------------- OUR RULES ------------ */

      'no-new': 'off',
      'no-param-reassign': 'off',
      'no-unused-expressions': 'off',
      'no-promise-executor-return': 'off',
      'lines-between-class-members': 'off',
    },

    settings: {
      react: {
        version: 'detect',
      },
      'import/resolver': {
        alias: {
          map: [['@', './src']],
          extensions: ['.js', '.jsx', '.ts', '.tsx'],
        },
      },
    },
  },

  prettier,
];
