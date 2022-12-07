import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const termsOfServiceFormatURILint: LinterMeta = {
  code: ApilintCodes.OPENAPI3_0_INFO_FIELD_TERMS_OF_SERVICE_FORMAT_URI,
  source: 'apilint',
  message: 'termsOfService MUST be in the format of a URL.',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintValidURI',
  marker: 'value',
  target: 'termsOfService',
  data: {},
};

export default termsOfServiceFormatURILint;
