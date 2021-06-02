require('@babel/register')({ extensions: ['.js', '.ts'], rootMode: 'upward' });

const chai = require('chai');
const { jestSnapshotPlugin, addSerializer } = require('mocha-chai-jest-snapshot');

const jestApiDOMSerializer = require('../../../scripts/jest-serializer-apidom');
const jestStringSerializer = require('../../../scripts/jest-serializer-string');

chai.use(jestSnapshotPlugin());
addSerializer(jestApiDOMSerializer);
addSerializer(jestStringSerializer);
