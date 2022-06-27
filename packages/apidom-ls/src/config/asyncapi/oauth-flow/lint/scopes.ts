import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const oAuthFlowScopesLint: LinterMeta = {
  code: ApilintCodes.OAUTH_FLOW_SCOPES,
  source: 'apilint',
  message: "'scopes' must be an object",
  severity: 1,
  linterFunction: 'apilintElementOrClass',
  linterParams: ['oauth-flow-scopes'],
  marker: 'value',
  target: 'scopes',
  data: {},
};

export default oAuthFlowScopesLint;
