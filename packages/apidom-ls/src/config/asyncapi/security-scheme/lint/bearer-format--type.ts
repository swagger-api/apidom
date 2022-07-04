import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const bearerFormatTypeLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI2_SECURITY_SCHEME_FIELD_BEARER_FORMAT_TYPE,
  source: 'apilint',
  message: "'bearerFormat' must be a string",
  severity: 1,
  linterFunction: 'apilintType',
  linterParams: ['string'],
  marker: 'value',
  target: 'bearerFormat',
  data: {},
};

export default bearerFormatTypeLint;
