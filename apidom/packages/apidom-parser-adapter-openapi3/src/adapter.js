'use strict';

const parser = require('./parser');

const mediaTypes = [
  'application/vnd.oai.openapi',
  'application/vnd.oai.openapi+json',
];

const detect = source => !!source.match(/(["']?)openapi\1\s*:\s*(["']?)3\.\d+\.\d+\2/g);

const parse = (source, options = {}) => {
  return parser(source, options);
}

module.exports = {
  mediaTypes,
  detect,
  parse,
};
