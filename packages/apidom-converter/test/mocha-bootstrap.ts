import { propEq } from 'ramda';
import { options } from '@swagger-api/apidom-reference';
import * as chai from 'chai';
import { jestSnapshotPlugin, addSerializer } from 'mocha-chai-jest-snapshot';

// @ts-ignore
import * as jestApiDOMSerializer from '../../../scripts/jest-serializer-apidom.mjs';
// @ts-ignore
import * as jestStringSerializer from '../../../scripts/jest-serializer-string.mjs';

chai.use(jestSnapshotPlugin());
addSerializer(jestApiDOMSerializer);
addSerializer(jestStringSerializer);

// setup allow list for file resolution
const fileResolver = options.resolve.resolvers.find(propEq('file', 'name'))!;
(fileResolver as any).fileAllowList = ['*'];
