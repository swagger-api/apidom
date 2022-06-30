import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const securityTypeLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI2_OPERATION_FIELD_SECURITY_TYPE,
  source: 'apilint',
  message: 'security must be an array of Security Requirement Objects',
  severity: 1,
  linterFunction: 'apilintElementOrClass',
  linterParams: [['server-security']],
  marker: 'key',
  target: 'security',
  data: {},
};

export default securityTypeLint;
