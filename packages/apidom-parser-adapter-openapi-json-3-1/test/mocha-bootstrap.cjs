/* eslint-disable */
require('@babel/register')({ extensions: ['.js', '.ts'], rootMode: 'upward' });

/**
 * Configure snapshot testing.
 */
const chai = require('chai');
const { jestSnapshotPlugin, addSerializer } = require('mocha-chai-jest-snapshot');

const jestApiDOMSerializer = require('../../../scripts/jest-serializer-apidom.cjs');
const jestStringSerializer = require('../../../scripts/jest-serializer-string.cjs');

chai.use(jestSnapshotPlugin());
addSerializer(jestApiDOMSerializer);
addSerializer(jestStringSerializer);
