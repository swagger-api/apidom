import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';
import { OpenAPI2, OpenAPI30 } from '../../../openapi/target-specs.ts';

const minimumValueLint: LinterMeta = {
  code: ApilintCodes.SCHEMA_MINIMUM_VALUE,
  source: 'apilint',
  message: "'minimum' must be a lower value than 'maximum'",
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintSchemaMinimumMaximum',
  linterParams: ['minimum', 'maximum'],
  marker: 'value',
  target: 'minimum',
  data: {},
  targetSpecs: [...OpenAPI2, ...OpenAPI30],
};

export default minimumValueLint;
