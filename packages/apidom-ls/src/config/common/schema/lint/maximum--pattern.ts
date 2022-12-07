import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const maximumPatternLint: LinterMeta = {
  code: ApilintCodes.SCHEMA_MAXIMUM,
  source: 'apilint',
  message: "maximum' value must be a number",
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintValueRegex',
  linterParams: ['^-?\\d*\\.{0,1}\\d+$', 'number'],
  marker: 'value',
  target: 'maximum',
  data: {},
};

export default maximumPatternLint;
