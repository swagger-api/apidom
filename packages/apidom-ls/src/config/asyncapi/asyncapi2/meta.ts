import asyncapiRootLints from './lint/lints';
import asyncapiRootComplete from './complete/asyncapi2';
import { FormatMeta } from '../../../apidom-language-types';

const asyncapi2Meta: FormatMeta = {
  lint: asyncapiRootLints,
  completion: asyncapiRootComplete,
};

export default asyncapi2Meta;
