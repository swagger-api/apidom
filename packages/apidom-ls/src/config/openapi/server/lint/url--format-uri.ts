import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const urlFormatURILint: LinterMeta = {
  code: ApilintCodes.OPENAPI3_O_SERVER_FIELD_URL_FORMAT_URI,
  source: 'apilint',
  message: 'url MUST be in the format of an URL.',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintValidURI',
  marker: 'value',
  target: 'url',
  data: {},
};

export default urlFormatURILint;
