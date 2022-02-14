module.exports = {
  babelrcRoots: ['packages/*'],
  env: {
    cjs: {
      presets: [
        [
          '@babel/preset-env',
          {
            debug: false,
            modules: 'commonjs',
            targets: {
              node: '12.22.0',
            },
            forceAllTransforms: false,
            ignoreBrowserslistConfig: true,
            exclude: ['transform-function-name'], // this is here because of https://github.com/babel/babel/discussions/12874
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
    es: {
      presets: [
        [
          '@babel/preset-env',
          {
            debug: false,
            modules: false,
            forceAllTransforms: true,
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
      ],
    },
    browser: {
      presets: [
        [
          '@babel/preset-env',
          {
            debug: false,
            corejs: 3,
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
