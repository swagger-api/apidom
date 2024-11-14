import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';

const tokenUrlFormatURILint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI2_OAUTH_FLOW_FIELD_TOKEN_URL_FORMAT_URI,
  source: 'apilint',
  message: "'tokenUrl' value must be a valid URL",
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintValidURI',
  marker: 'value',
  target: 'tokenUrl',
  data: {},
};

export default tokenUrlFormatURILint;
