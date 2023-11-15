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
    'no-unused-vars': 'off',
    'import/no-extraneous-dependencies': 'off', // ['error', { devDependencies: true }],
    'import/no-mutable-exports': 'off',
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
    'no-labels': 'off',
    'no-restricted-syntax': 'off',
    'no-nested-ternary': 'off',
    '@typescript-eslint/return-await': 'off', // we want ['error', 'in-try-catch'] but if we enable it we get false positives
    '@typescript-eslint/camelcase': 'off',
    '@typescript-eslint/no-redeclare': 'off', // we should enable this in future and fix all the reported issues
    '@typescript-eslint/no-unused-vars': ['error'],
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/no-explicit-any': 1,
  },
  plugins: ['@typescript-eslint', 'import'],
  extends: [
    'airbnb-base',
    'airbnb-typescript/base', // uses rules from AirBnb codestyle
    'plugin:prettier/recommended', // enables eslint-plugin-prettier and eslint-config-prettier. This will display prettier errors as ESLint errors. Make sure this is always the last configuration in the extends array.
    'plugin:@typescript-eslint/recommended', // Uses the recommended rules from the @typescript-eslint/eslint-plugin
  ],
};
