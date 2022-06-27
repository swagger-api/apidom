import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const securitySchemeNameLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI_SECURITYSCHEME_NAME,
  source: 'apilint',
  message: "'name' must be a string",
  severity: 1,
  linterFunction: 'apilintType',
  linterParams: ['string'],
  marker: 'value',
  target: 'name',
  data: {},
};

export default securitySchemeNameLint;
