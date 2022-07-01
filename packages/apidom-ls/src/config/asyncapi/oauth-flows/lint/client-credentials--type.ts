import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const clientCredentialsTypeLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI2_OAUTH_FLOWS_FIELD_CLIENT_CREDENTIALS_TYPE,
  source: 'apilint',
  message: "'clientCredentials' must be an object",
  severity: 1,
  linterFunction: 'apilintElementOrClass',
  linterParams: ['oAuthFlow'],
  marker: 'value',
  target: 'clientCredentials',
  data: {},
};

export default clientCredentialsTypeLint;
