import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../../codes.ts';
import { LinterMeta } from '../../../../../apidom-language-types.ts';
import { JSONSchema202012 } from '../../target-specs.ts';

const typeEqualsLint: LinterMeta = {
  code: ApilintCodes.JSON_SCHEMA_2020_12_KEYWORD_TYPE_EQUALS,
  source: 'apilint',
  message:
    "'type' must be one of allowed values: array, boolean, integer, null, number, object, string",
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintValueOrArray',
  linterParams: [['array', 'boolean', 'integer', 'null', 'number', 'object', 'string'], true],
  marker: 'value',
  target: 'type',
  data: {},
  targetSpecs: JSONSchema202012,
};

export default typeEqualsLint;
