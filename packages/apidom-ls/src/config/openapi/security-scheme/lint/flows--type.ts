import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const flowsTypeLint: LinterMeta = {
  code: ApilintCodes.OPENAPI3_SECURITY_SCHEME_FIELD_FLOWS_TYPE,
  source: 'apilint',
  message: 'flows must be an object',
  severity: 1,
  linterFunction: 'apilintElementOrClass',
  linterParams: ['flows'],
  marker: 'value',
  target: 'flows',
  data: {},
};

export default flowsTypeLint;
