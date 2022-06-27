import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const securitySchemeOpenIdConnectUrlLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI_SECURITYSCHEME_OPEN_ID_CONNECT_URL,
  source: 'apilint',
  message: "'openIdConnectUrl' value must be a valid URL",
  severity: 1,
  linterFunction: 'apilintValidURI',
  marker: 'value',
  target: 'openIdConnectUrl',
  data: {},
};

export default securitySchemeOpenIdConnectUrlLint;
