import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../../codes.ts';
import { LinterMeta } from '../../../../../apidom-language-types.ts';
import { JSONSchema202012 } from '../../target-specs.ts';

const exclusiveMaximumTypeLint: LinterMeta = {
  code: ApilintCodes.JSON_SCHEMA_2020_12_KEYWORD_EXCLUSIVE_MAXIMUM_TYPE,
  source: 'apilint',
  message: "'exclusiveMaximum' must be a number",
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintType',
  linterParams: ['number'],
  marker: 'value',
  target: 'exclusiveMaximum',
  data: {},
  targetSpecs: JSONSchema202012,
};

export default exclusiveMaximumTypeLint;
