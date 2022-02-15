module.exports = {
  babelrcRoots: ['packages/*'],
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
      ],
    },
    'cjs-new': {
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
          ? ['babel-plugin-add-import-extension', { extension: 'cjs' }]
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
            exclude: ['transform-function-name'],
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
        ['babel-plugin-add-import-extension', { extension: 'js' }],
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
            exclude: ['transform-function-name'],
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
