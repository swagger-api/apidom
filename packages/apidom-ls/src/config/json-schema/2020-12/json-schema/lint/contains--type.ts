import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../../codes.ts';
import { LinterMeta } from '../../../../../apidom-language-types.ts';
import { JSONSchema202012 } from '../../target-specs.ts';

const containsTypeLint: LinterMeta = {
  code: ApilintCodes.JSON_SCHEMA_2020_12_KEYWORD_CONTAINS_TYPE,
  source: 'apilint',
  message: "'contains' must be a JSON Schema",
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintElementOrClass',
  linterParams: [['JSONSchema202012', 'boolean']],
  marker: 'value',
  target: 'contains',
  data: {},
  targetSpecs: JSONSchema202012,
};

export default containsTypeLint;
