import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const minimumPatternLint: LinterMeta = {
  code: ApilintCodes.SCHEMA_MINUMUM,
  source: 'apilint',
  message: "minimum' value must be a number",
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintValueRegex',
  linterParams: ['^-?\\d*\\.{0,1}\\d+$', 'number'],
  marker: 'value',
  target: 'minimum',
  data: {},
};

export default minimumPatternLint;
