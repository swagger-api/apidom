import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const securitySchemeFlowsLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI_SECURITYSCHEME_FLOWS,
  source: 'apilint',
  message: "'flows' must be an object",
  severity: 1,
  linterFunction: 'apilintElementOrClass',
  linterParams: ['oAuthFlows'],
  marker: 'value',
  target: 'flows',
  data: {},
};

export default securitySchemeFlowsLint;
