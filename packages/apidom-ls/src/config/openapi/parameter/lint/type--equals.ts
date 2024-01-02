import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';
import { OpenAPI2 } from '../../target-specs';

const typeEqualsLint: LinterMeta = {
  code: ApilintCodes.OPENAPI2_PARAMETER_FIELD_TYPE_EQUALS,
  source: 'apilint',
  message: "'in' must be one of allowed values: query, header, path, formData, body",
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintValueOrArray',
  linterParams: [['string', 'number', 'integer', 'boolean', 'array', 'file']],
  marker: 'value',
  target: 'type',
  data: {},
  targetSpecs: OpenAPI2,
};

export default typeEqualsLint;
