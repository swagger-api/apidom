import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';
import { OpenAPI2 } from '../../target-specs';

const typeEqualsLint: LinterMeta = {
  code: ApilintCodes.OPENAPI2_ITEMS_FIELD_TYPE_EQUALS,
  source: 'apilint',
  message: "'type' must be one of allowed values: string, number, integer, boolean, array",
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintValueOrArray',
  linterParams: [['string', 'number', 'integer', 'boolean', 'array']],
  marker: 'value',
  target: 'type',
  data: {},
  targetSpecs: OpenAPI2,
};

export default typeEqualsLint;
