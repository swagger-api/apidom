import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const securitySchemeInLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI_SECURITYSCHEME_IN,
  source: 'apilint',
  message: "'in' must be a string",
  severity: 1,
  linterFunction: 'apilintType',
  linterParams: ['string'],
  marker: 'value',
  target: 'in',
  data: {},
};

export default securitySchemeInLint;
