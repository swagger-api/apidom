const path = require('node:path');

module.exports = {
  babelrcRoots: ['packages/*'],
  ignore: [
    '**/*.d.ts',
  ],
  env: {
    cjs: {
      presets: [
        [
          '@babel/preset-env',
          {
            debug: false,
            modules: false,
            targets: {
              node: '12.22.0',
            },
            forceAllTransforms: false,
            ignoreBrowserslistConfig: true,
            exclude: ['transform-function-name'],
          },
        ],
        '@babel/preset-typescript',
      ],
      plugins: [
        [
          '@babel/plugin-transform-modules-commonjs',
          {
            loose: true,
          },
        ],
        [
          '@babel/plugin-transform-runtime',
          {
            corejs: 3,
            version: '^7',
          },
        ],
        'babel-plugin-native-error-extend',
        process.env.NODE_ENV !== 'test'
          ? [path.join(__dirname, './scripts/babel-plugin-add-import-extension.cjs'), { extension: 'cjs' }]
          : false
      ].filter(Boolean),
    },
    es: {
      presets: [
        [
          '@babel/preset-env',
          {
            debug: false,
            modules: false,
            targets: {
              node: '12.22.0',
            },
            ignoreBrowserslistConfig: true,
            exclude: ['transform-function-name'], // this is here because of https://github.com/babel/babel/discussions/12874
          },
        ],
        '@babel/preset-typescript',
      ],
      plugins: [
        '@babel/proposal-class-properties',
        '@babel/proposal-object-rest-spread',
        [
          '@babel/plugin-transform-runtime',
          {
            corejs: 3,
            version: '^7',
            useESModules: true,
          },
        ],
        'babel-plugin-native-error-extend',
        [path.join(__dirname, './scripts/babel-plugin-add-import-extension.cjs'), { extension: 'js' }],
      ],
    },
    browser: {
      presets: [
        [
          '@babel/preset-env',
          {
            debug: false,
            useBuiltIns: false,
            ignoreBrowserslistConfig: false,
            exclude: ['transform-function-name'], // this is here because of https://github.com/babel/babel/discussions/12874
          },
        ],
        '@babel/preset-typescript',
      ],
      plugins: [
        '@babel/proposal-class-properties',
        '@babel/proposal-object-rest-spread',
        [
          '@babel/plugin-transform-runtime',
          {
            corejs: 3,
            version: '^7',
            useESModules: true,
          },
        ],
        'babel-plugin-native-error-extend',
      ],
    },
  },
};
