import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ['**/*.{js,mjs,cjs,ts}'],
    languageOptions: { globals: globals.browser },
    rules: {
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          varsIgnorePattern: '^res$|^next$', // Ignore variables res and next
          argsIgnorePattern: '^res$|^next$', // Ignore arguments res and next
        },
      ],
    },
  },

  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
];
