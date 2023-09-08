const path = require('node:path');

module.exports = {
  babelrcRoots: ['packages/*'],
  ignore: [
    '**/*.d.ts',
  ],
  env: {
    cjs: {
      browserslistEnv: "isomorphic-production",
      presets: [
        [
          '@babel/preset-env',
          {
            debug: false,
            modules: "commonjs",
            loose: true,
            useBuiltIns: false,
            forceAllTransforms: false,
            ignoreBrowserslistConfig: false,
            exclude: ['transform-function-name'],
          },
        ],
        '@babel/preset-typescript',
      ],
      plugins: [
        [
          '@babel/plugin-transform-runtime',
          {
            corejs: { version: 3, proposals: false },
            absoluteRuntime: false,
            helpers: true,
            regenerator: false,
            version: '^7.22.15',
          },
        ],
        process.env.NODE_ENV !== 'test'
          ? [path.join(__dirname, './scripts/babel-plugin-add-import-extension.cjs'), { extension: 'cjs' }]
          : false
      ].filter(Boolean),
    },
    es: {
      browserslistEnv: "isomorphic-production",
      presets: [
        [
          '@babel/preset-env',
          {
            debug: false,
            modules: false,
            useBuiltIns: false,
            forceAllTransforms: false,
            ignoreBrowserslistConfig: false,
            exclude: ['transform-function-name'], // this is here because of https://github.com/babel/babel/discussions/12874
          },
        ],
        '@babel/preset-typescript',
      ],
      plugins: [
        [
          '@babel/plugin-transform-runtime',
          {
            corejs: { version: 3, proposals: false },
            absoluteRuntime: false,
            helpers: true,
            regenerator: false,
            useESModules: true,
            version: '^7.22.15',
          },
        ],
        [path.join(__dirname, './scripts/babel-plugin-add-import-extension.cjs'), { extension: 'js' }],
      ],
    },
    browser: {
      browserslistEnv: "browser-production",
      presets: [
        [
          '@babel/preset-env',
          {
            debug: false,
            modules: 'auto',
            useBuiltIns: false,
            forceAllTransforms: false,
            ignoreBrowserslistConfig: false,
            exclude: ['transform-function-name'], // this is here because of https://github.com/babel/babel/discussions/12874
          },
        ],
        '@babel/preset-typescript',
      ],
      plugins: [
        [
          '@babel/plugin-transform-runtime',
          {
            corejs: { version: 3, proposals: false },
            absoluteRuntime: false,
            helpers: true,
            regenerator: false,
            version: '^7.22.15',
          },
        ],
      ]
    },
  },
};
