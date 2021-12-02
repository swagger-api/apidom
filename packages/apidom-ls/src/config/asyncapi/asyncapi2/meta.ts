import asyncapiRootLints from './lint/lints';
import asyncapiRootComplete from './complete/asyncapi2';
import { FormatMeta } from '../../../apidom-language-types';
import asyncapi2Docs from './docs/asyncapi2';

const asyncapi2Meta: FormatMeta = {
  lint: asyncapiRootLints,
  completion: asyncapiRootComplete,
  documentation: asyncapi2Docs,
};

export default asyncapi2Meta;
