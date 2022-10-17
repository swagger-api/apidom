import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const schemeTypeLint: LinterMeta = {
  code: ApilintCodes.OPENAPI3_SECURITY_SCHEME_FIELD_SCHEME_TYPE,
  source: 'apilint',
  message: 'scheme must be a string',
  severity: 1,
  linterFunction: 'apilintType',
  linterParams: ['string'],
  marker: 'value',
  target: 'scheme',
  data: {},
};

export default schemeTypeLint;
