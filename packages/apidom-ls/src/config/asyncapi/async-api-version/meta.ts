import asyncapiVersionLints from './lint/lints';
// import asyncapiVersionComplete from './complete/asyncapiversion';
import { FormatMeta } from '../../../apidom-language-types';

const asyncApiVersionMeta: FormatMeta = {
  lint: asyncapiVersionLints,
  // completion: asyncapiVersionComplete,
};

export default asyncApiVersionMeta;
