import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const authorizationUrlFormatURILint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI2_OAUTH_FLOW_FIELD_AUTHORIZATION_URL_FORMAT_URI,
  source: 'apilint',
  message: "'authorizationUrl' value must be a valid URL",
  severity: 1,
  linterFunction: 'apilintValidURI',
  marker: 'value',
  target: 'authorizationUrl',
  data: {},
};

export default authorizationUrlFormatURILint;
