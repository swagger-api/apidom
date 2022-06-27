import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const oAuthFlowTokenUrlLint: LinterMeta = {
  code: ApilintCodes.OAUTH_FLOW_TOKEN_URL,
  source: 'apilint',
  message: "'tokenUrl' value must be a valid URL",
  severity: 1,
  linterFunction: 'apilintValidURI',
  marker: 'value',
  target: 'tokenUrl',
  data: {},
};

export default oAuthFlowTokenUrlLint;
