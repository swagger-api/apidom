import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const contentTypeLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI2_MESSAGE_TRAIT_FIELD_CONTENT_TYPE_TYPE,
  source: 'apilint',
  message: "'contentType' value must be a string",
  severity: 1,
  linterFunction: 'apilintType',
  linterParams: ['string'],
  marker: 'value',
  target: 'contentType',
  data: {},
};

export default contentTypeLint;
