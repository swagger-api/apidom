import * as chai from 'chai';
import { jestSnapshotPlugin, addSerializer } from 'mocha-chai-jest-snapshot';

// eslint-disable-next-line import/no-relative-packages
import * as jestApiDOMSerializer from '../../../scripts/jest-serializer-apidom.mjs';
// eslint-disable-next-line import/no-relative-packages
import * as jestStringSerializer from '../../../scripts/jest-serializer-string.mjs';

chai.use(jestSnapshotPlugin());
addSerializer(jestApiDOMSerializer);
addSerializer(jestStringSerializer);
