import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const securityTypeLint: LinterMeta = {
  code: ApilintCodes.OPENAPI3_1_OPEN_API_FIELD_SECURITY_TYPE,
  source: 'apilint',
  message: 'security must be an array',
  severity: 1,
  linterFunction: 'apilintElementOrClass',
  linterParams: ['security'],
  marker: 'value',
  target: 'security',
  data: {},
};

export default securityTypeLint;
