import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const serverSecurityLint: LinterMeta = {
  code: ApilintCodes.SERVER_SECURITY,
  source: 'apilint',
  message: 'security must be an array of security requirements',
  severity: 1,
  linterFunction: 'apilintArrayOfType',
  linterParams: ['object'],
  marker: 'key',
  target: 'security',
  data: {},
};

export default serverSecurityLint;
