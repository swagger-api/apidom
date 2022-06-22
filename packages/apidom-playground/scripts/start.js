const path = require('node:path');
const rewire = require('rewire');

process.chdir(path.join(__dirname, '..'));

const start = rewire('react-scripts/scripts/start.js');
const configFactory = start.__get__('configFactory');
const configFactoryMock = (webpackEnv) => {
  const config = configFactory(webpackEnv);

  // fallbacks
  config.resolve.fallback = {
    ...config.resolve.fallback,
    fs: false,
    path: false,
    util: false,
  };

  return config;
};

start.__set__('configFactory', configFactoryMock);
