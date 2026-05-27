export default {
  extends: ['@commitlint/config-conventional'],
  defaultIgnores: true,
  ignores: [
    // This commit was pushed without a conventional commit type prefix and
    // cannot be rewritten as the branch is shared. It is safe to ignore.
    (message) => message === 'Use PR head SHA in build workflow checkouts',
  ],
  rules: {
    'header-max-length': [2, 'always', 75],
    'scope-case': [
      2,
      'always',
      [
        'camel-case',
        'kebab-case',
        'upper-case',
        'lower-case',
        'pascal-case',
        'sentence-case',
        'snake-case',
        'start-case',
      ],
    ],
    'subject-case': [0, 'always'],
  },
};
