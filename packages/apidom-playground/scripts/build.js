const path = require('node:path');
const rewire = require('rewire');

process.chdir(path.join(__dirname, '..'));

const build = rewire('react-scripts/scripts/build.js');
const config = build.__get__('config');

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

// faulty source maps
config.module.rules[0].exclude = [config.module.rules[0].exclude, /unraw/];
