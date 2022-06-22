const path = require('node:path');
const rewire = require('rewire');

process.chdir(path.join(__dirname, '..'));

const start = rewire('react-scripts/scripts/start.js');
const configFactory = start.__get__('configFactory');
const configFactoryMock = (webpackEnv) => {
  const config = configFactory(webpackEnv);

  // externals
  config.externals = {
    ...config.externals,
    'node:fs': '{}',
    'node:util': '{}',
  };

  // fallbacks
  config.resolve.fallback = {
    ...config.resolve.fallback,
    fs: false,
    path: false,
  };

  return config;
};

start.__set__('configFactory', configFactoryMock);
