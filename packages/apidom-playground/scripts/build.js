const path = require('path');
const rewire = require('rewire');

process.chdir(path.join(__dirname, '..'));

const build = rewire('react-scripts/scripts/build.js');
const config = build.__get__('config');

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

// faulty source maps
config.module.rules[0].exclude = [config.module.rules[0].exclude, /unraw/, /@reduxjs/];
