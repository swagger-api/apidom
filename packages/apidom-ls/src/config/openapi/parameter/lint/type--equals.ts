import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';
import { OpenAPI2 } from '../../target-specs.ts';

const typeEqualsLint: LinterMeta = {
  code: ApilintCodes.OPENAPI2_PARAMETER_FIELD_TYPE_EQUALS,
  source: 'apilint',
  message: "'type' must be one of allowed values: string, number, integer, boolean, array, file",
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintValueOrArray',
  linterParams: [['string', 'number', 'integer', 'boolean', 'array', 'file']],
  marker: 'value',
  target: 'type',
  data: {},
  targetSpecs: OpenAPI2,
};

export default typeEqualsLint;
