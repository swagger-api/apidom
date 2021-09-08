module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020, // allows for the parsing of modern ECMAScript features
    sourceType: 'module', // allows for the use of imports
    tsconfigRootDir: __dirname,
    project: ['./tsconfig.json'],
  },
  rules: {
    quotes: ['error', 'single', { avoidEscape: true }],
    'no-return-await': 'off',
    '@typescript-eslint/return-await': 'error',
    '@typescript-eslint/camelcase': 'off',
    '@typescript-eslint/no-redeclare': 'off', // we should enable this in future and fix all the reporter issues
    '@typescript-eslint/no-unused-vars': ['error'],
    '@typescript-eslint/ban-ts-comment': 'off',
    'no-unused-vars': 'off',
    'import/no-extraneous-dependencies': 'off', // ['error', { devDependencies: true }],
    'import/no-mutable-exports': 0,
    'import/order': [
      'error',
      {
        groups: [
          ['builtin', 'external', 'internal'],
          ['parent', 'sibling', 'index'],
        ],
        'newlines-between': 'always',
      },
    ],
    'no-labels': 0,
    'no-restricted-syntax': 0,
    'no-nested-ternary': 0,
  },
  plugins: ['@typescript-eslint', 'import'],
  extends: [
    'plugin:@typescript-eslint/recommended', // Uses the recommended rules from the @typescript-eslint/eslint-plugin
    'plugin:prettier/recommended', // enables eslint-plugin-prettier and eslint-config-prettier. This will display prettier errors as ESLint errors. Make sure this is always the last configuration in the extends array.
    'airbnb-typescript/base', // uses rules from AirBnb codestyle
  ],
};
