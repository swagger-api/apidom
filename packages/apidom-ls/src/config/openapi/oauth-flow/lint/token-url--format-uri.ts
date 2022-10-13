import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const tokenUrlFormatURILint: LinterMeta = {
  code: ApilintCodes.OPENAPI3_0_OAUTH_FLOW_FIELD_TOKEN_URL_FORMAT_URI,
  source: 'apilint',
  message: "'tokenUrl' value must be a valid URL",
  severity: 1,
  linterFunction: 'apilintValidURI',
  marker: 'value',
  target: 'tokenUrl',
  data: {},
};

export default tokenUrlFormatURILint;
