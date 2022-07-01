import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const schemaFormatTypeLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI2_MESSAGE_TRAIT_FIELD_SCHEMA_FORMAT_TYPE,
  source: 'apilint',
  message: "'schemaFormat' value must be a string",
  severity: 1,
  linterFunction: 'apilintType',
  linterParams: ['string'],
  marker: 'value',
  target: 'schemaFormat',
  data: {},
};

export default schemaFormatTypeLint;
