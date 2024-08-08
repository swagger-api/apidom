require('@babel/register')({ extensions: ['.js', '.ts'], rootMode: 'upward' });

const chai = require('chai');
const { jestSnapshotPlugin, addSerializer } = require('mocha-chai-jest-snapshot');

const jestApiDOMSerializer = require('../../../scripts/jest-serializer-apidom.cjs');
const jestStringSerializer = require('../../../scripts/jest-serializer-string.cjs');
const { options } = require('../src/configuration/saturated');

// setup snapshot testing
chai.use(jestSnapshotPlugin());
addSerializer(jestApiDOMSerializer);
addSerializer(jestStringSerializer);

// setup allow list for file resolution
const [fileResolver] = options.resolve.resolvers;
fileResolver.fileAllowList = ['*'];

// setup allowed file extensions
options.parse.parsers.forEach((parser) => {
  if (parser.name.includes('yaml')) {
    parser.fileExtensions = ['.yaml', '.yml']; // eslint-disable-line  no-param-reassign
  } else if (parser.name.includes('json')) {
    parser.fileExtensions = ['.json']; // eslint-disable-line  no-param-reassign
  }
});
