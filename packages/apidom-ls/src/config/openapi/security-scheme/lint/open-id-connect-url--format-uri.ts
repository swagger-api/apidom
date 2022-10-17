import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const openIdConnectUrlFormatURILint: LinterMeta = {
  code: ApilintCodes.OPENAPI3_SECURITY_SCHEME_FIELD_OPEN_ID_CONNECT_URL_FORMAT_URI,
  source: 'apilint',
  message: 'openIdConnectUrl MUST be in the format of an absolute URL.',
  severity: 1,
  linterFunction: 'apilintValidURI',
  linterParams: [true],
  marker: 'value',
  target: 'openIdConnectUrl',
  data: {},
};

export default openIdConnectUrlFormatURILint;
