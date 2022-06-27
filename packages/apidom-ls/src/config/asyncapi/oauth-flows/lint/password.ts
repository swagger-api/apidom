import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const oAuthFlowsPasswordLint: LinterMeta = {
  code: ApilintCodes.OAUTH_FLOWS_PASSWORD,
  source: 'apilint',
  message: "'password' must be an object",
  severity: 1,
  linterFunction: 'apilintElementOrClass',
  linterParams: ['oAuthFlow'],
  marker: 'value',
  target: 'password',
  data: {},
};

export default oAuthFlowsPasswordLint;
