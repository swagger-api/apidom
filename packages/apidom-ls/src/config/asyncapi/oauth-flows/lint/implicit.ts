import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const oAuthFlowsImplicitLint: LinterMeta = {
  code: ApilintCodes.OAUTH_FLOWS_IMPLICIT,
  source: 'apilint',
  message: "'implicit' must be an object",
  severity: 1,
  linterFunction: 'apilintElementOrClass',
  linterParams: ['oAuthFlow'],
  marker: 'value',
  target: 'implicit',
  data: {},
};

export default oAuthFlowsImplicitLint;
