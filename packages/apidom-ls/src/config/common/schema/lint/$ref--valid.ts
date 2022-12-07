import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const $refValidLint: LinterMeta = {
  code: ApilintCodes.SCHEMA_REF,
  source: 'apilint',
  message: "'$ref' value must be a valid URI-reference",
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintValidURI',
  marker: 'value',
  target: '$ref',
  data: {},
};

export default $refValidLint;
