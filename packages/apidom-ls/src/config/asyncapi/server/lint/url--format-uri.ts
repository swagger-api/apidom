import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';

const urlFormatURILint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI2_SERVER_FIELD_URL_FORMAT_URI,
  source: 'apilint',
  message: "'url' value must be a valid URL",
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintValidURI',
  marker: 'value',
  target: 'url',
  data: {},
};

export default urlFormatURILint;
