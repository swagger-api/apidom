import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const refreshUrlFormatURILint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI2_OAUTH_FLOW_FIELD_REFRESH_URL_FORMAT_URI,
  source: 'apilint',
  message: "'refreshUrl' value must be a valid URL",
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintValidURI',
  marker: 'value',
  target: 'refreshUrl',
  data: {},
};

export default refreshUrlFormatURILint;
