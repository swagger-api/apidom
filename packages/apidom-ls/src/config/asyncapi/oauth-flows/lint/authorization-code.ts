import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const oAuthFlowsAuthorizationCodeLint: LinterMeta = {
  code: ApilintCodes.OAUTH_FLOWS_AUTHORIZATION_CODE,
  source: 'apilint',
  message: "'authorizationCode' must be an object",
  severity: 1,
  linterFunction: 'apilintElementOrClass',
  linterParams: ['oAuthFlow'],
  marker: 'value',
  target: 'authorizationCode',
  data: {},
};

export default oAuthFlowsAuthorizationCodeLint;
