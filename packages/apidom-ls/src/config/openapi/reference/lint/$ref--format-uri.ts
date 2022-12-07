import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const $refFormatURILint: LinterMeta = {
  code: ApilintCodes.OPENAPI3_0_REFERENCE_FIELD_$REF_FORMAT_URI,
  source: 'apilint',
  message: "'$ref' value must be a valid URI-reference",
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintValidURI',
  marker: 'value',
  target: '$ref',
  data: {},
};

export default $refFormatURILint;
