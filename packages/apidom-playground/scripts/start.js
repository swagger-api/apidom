const path = require('path');
const rewire = require('rewire');

process.chdir(path.join(__dirname, '..'));

const start = rewire('react-scripts/scripts/start.js');
const configFactory = start.__get__('configFactory');
const configFactoryMock = (webpackEnv) => {
  const config = configFactory(webpackEnv);

  // display errors for child compilations
  config.stats = {
    ...config.stats,
    children: true,
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
