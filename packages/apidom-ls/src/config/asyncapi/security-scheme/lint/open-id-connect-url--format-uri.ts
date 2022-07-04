import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const openIdConnectUrlFormatURILint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI2_SECURITY_SCHEME_FIELD_OPEN_ID_CONNECT_URL_TYPE,
  source: 'apilint',
  message: "'openIdConnectUrl' value must be a valid URL",
  severity: 1,
  linterFunction: 'apilintValidURI',
  marker: 'value',
  target: 'openIdConnectUrl',
  data: {},
};

export default openIdConnectUrlFormatURILint;
