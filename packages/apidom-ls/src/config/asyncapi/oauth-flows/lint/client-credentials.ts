import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const oAuthFlowsClientCredentialsLint: LinterMeta = {
  code: ApilintCodes.OAUTH_FLOWS_CLIENT_CREDENTIALS,
  source: 'apilint',
  message: "'clientCredentials' must be an object",
  severity: 1,
  linterFunction: 'apilintElementOrClass',
  linterParams: ['oAuthFlow'],
  marker: 'value',
  target: 'clientCredentials',
  data: {},
};

export default oAuthFlowsClientCredentialsLint;
