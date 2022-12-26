require('@babel/register')({ extensions: ['.js', '.ts'], rootMode: 'upward' });

const chai = require('chai');
const { jestSnapshotPlugin, addSerializer } = require('mocha-chai-jest-snapshot');

const jestApiDOMSerializer = require('../../../scripts/jest-serializer-apidom.cjs');
const jestStringSerializer = require('../../../scripts/jest-serializer-string.cjs');
const { options } = require('../src/configuration/complete');

// setup snapshot testing
chai.use(jestSnapshotPlugin());
addSerializer(jestApiDOMSerializer);
addSerializer(jestStringSerializer);

// setup allow list for file resolution
const [fileResolver] = options.resolve.resolvers;
fileResolver.fileAllowList = ['*'];
