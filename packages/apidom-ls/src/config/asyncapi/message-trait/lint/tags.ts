import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const messageTraitTagsLint: LinterMeta = {
  code: ApilintCodes.MESSAGE_TRAIT_TAGS,
  source: 'apilint',
  message: 'tags must be an array of Tags',
  severity: 1,
  linterFunction: 'apilintArrayOfType',
  linterParams: ['object'],
  marker: 'key',
  markerTarget: 'tags',
  target: 'tags',
  data: {},
};

export default messageTraitTagsLint;
