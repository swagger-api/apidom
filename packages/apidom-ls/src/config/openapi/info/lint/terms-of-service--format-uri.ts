import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';
import { OpenAPI3 } from '../../target-specs.ts';

const termsOfServiceFormatURILint: LinterMeta = {
  code: ApilintCodes.OPENAPI3_0_INFO_FIELD_TERMS_OF_SERVICE_FORMAT_URI,
  source: 'apilint',
  message: 'termsOfService MUST be in the format of a URL.',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintValidURI',
  marker: 'value',
  target: 'termsOfService',
  data: {},
  targetSpecs: OpenAPI3,
};

export default termsOfServiceFormatURILint;
