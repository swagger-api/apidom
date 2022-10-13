import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const refreshUrlFormatURILint: LinterMeta = {
  code: ApilintCodes.OPENAPI3_0_OAUTH_FLOW_FIELD_REFRESH_URL_FORMAT_URI,
  source: 'apilint',
  message: "'refreshUrl' value must be a valid URL",
  severity: 1,
  linterFunction: 'apilintValidURI',
  marker: 'value',
  target: 'refreshUrl',
  data: {},
};

export default refreshUrlFormatURILint;
