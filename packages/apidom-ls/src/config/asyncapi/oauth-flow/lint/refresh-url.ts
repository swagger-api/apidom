import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const oAuthFlowRefreshUrlLint: LinterMeta = {
  code: ApilintCodes.OAUTH_FLOW_REFRESH_URL,
  source: 'apilint',
  message: "'refreshUrl' value must be a valid URL",
  severity: 1,
  linterFunction: 'apilintValidURI',
  marker: 'value',
  target: 'refreshUrl',
  data: {},
};

export default oAuthFlowRefreshUrlLint;
