import * as chai from 'chai';
import { jestSnapshotPlugin, addSerializer } from 'mocha-chai-jest-snapshot';

// @ts-ignore
import * as jestApiDOMSerializer from '../../../scripts/jest-serializer-apidom.mjs';
// @ts-ignore
import * as jestStringSerializer from '../../../scripts/jest-serializer-string.mjs';

chai.use(jestSnapshotPlugin());
addSerializer(jestApiDOMSerializer);
addSerializer(jestStringSerializer);
