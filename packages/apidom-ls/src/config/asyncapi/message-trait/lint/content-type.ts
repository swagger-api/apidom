import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const messageTraitContentTypeLint: LinterMeta = {
  code: ApilintCodes.MESSAGE_TRAIT_CONTENTTYPE,
  source: 'apilint',
  message: "'contentType' value must be a string",
  severity: 1,
  linterFunction: 'apilintType',
  linterParams: ['string'],
  marker: 'value',
  target: 'contentType',
  data: {},
};

export default messageTraitContentTypeLint;
