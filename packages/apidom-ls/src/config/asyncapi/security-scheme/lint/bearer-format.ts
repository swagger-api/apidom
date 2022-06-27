import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const securitySchemeBearerFormatLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI_SECURITYSCHEME_BEARER_FORMAT,
  source: 'apilint',
  message: "'bearerFormat' must be a string",
  severity: 1,
  linterFunction: 'apilintType',
  linterParams: ['string'],
  marker: 'value',
  target: 'bearerFormat',
  data: {},
};

export default securitySchemeBearerFormatLint;
