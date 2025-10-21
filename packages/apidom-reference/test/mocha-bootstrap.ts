import { propEq } from 'ramda';
import * as chai from 'chai';
import { jestSnapshotPlugin, addSerializer } from 'mocha-chai-jest-snapshot';

// @ts-ignore
import * as jestApiDOMSerializer from '../../../scripts/jest-serializer-apidom.mjs';
// @ts-ignore
import * as jestStringSerializer from '../../../scripts/jest-serializer-string.mjs';
import { options } from '../src/configuration/saturated.ts';

chai.use(jestSnapshotPlugin());
addSerializer(jestApiDOMSerializer);
addSerializer(jestStringSerializer);

// setup allow list for file resolution
const fileResolver = options.resolve.resolvers.find(propEq('file', 'name'))!;
(fileResolver as any).fileAllowList = ['*'];

// setup allowed file extensions
options.parse.parsers.forEach((parser: any) => {
  if (parser.name.includes('yaml')) {
    parser.fileExtensions = ['.yaml', '.yml']; // eslint-disable-line  no-param-reassign
  } else if (parser.name.includes('json')) {
    parser.fileExtensions = ['.json']; // eslint-disable-line  no-param-reassign
  }
});
