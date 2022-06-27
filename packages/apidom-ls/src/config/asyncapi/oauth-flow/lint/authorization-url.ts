import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const oAuthFlowAuthorizationUrlLint: LinterMeta = {
  code: ApilintCodes.OAUTH_FLOW_AUTHORIZATION_URL,
  source: 'apilint',
  message: "'authorizationUrl' value must be a valid URL",
  severity: 1,
  linterFunction: 'apilintValidURI',
  marker: 'value',
  target: 'authorizationUrl',
  data: {},
};

export default oAuthFlowAuthorizationUrlLint;
