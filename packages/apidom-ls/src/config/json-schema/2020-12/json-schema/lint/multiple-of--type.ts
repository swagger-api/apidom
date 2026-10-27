import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../../codes.ts';
import { LinterMeta } from '../../../../../apidom-language-types.ts';
import { JSONSchema202012 } from '../../target-specs.ts';

const multipleOfTypeLint: LinterMeta = {
  code: ApilintCodes.JSON_SCHEMA_2020_12_KEYWORD_MULTIPLE_OF_TYPE,
  source: 'apilint',
  message: "'multipleOf' must be a number greater than 0",
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintNumber',
  linterParams: [false, true, false],
  marker: 'value',
  target: 'multipleOf',
  data: {},
  targetSpecs: JSONSchema202012,
};

export default multipleOfTypeLint;
