import * as chai from 'chai';
import { jestSnapshotPlugin, addSerializer } from 'mocha-chai-jest-snapshot';
import jsdomGlobal from 'jsdom-global';

// @ts-ignore
import * as jestApiDOMSerializer from '../../../scripts/jest-serializer-apidom.mjs';
// @ts-ignore
import * as jestStringSerializer from '../../../scripts/jest-serializer-string.mjs';

/**
 * Configure snapshot testing.
 */
chai.use(jestSnapshotPlugin());
addSerializer(jestApiDOMSerializer);
addSerializer(jestStringSerializer);

/**
 * JSDOM setup.
 */
jsdomGlobal();
