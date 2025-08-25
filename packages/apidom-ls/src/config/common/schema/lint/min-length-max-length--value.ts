import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';
import { OpenAPI2, OpenAPI30 } from '../../../openapi/target-specs.ts';

const minLengthValueLint: LinterMeta = {
  code: ApilintCodes.SCHEMA_MIN_LENGTH_VALUE,
  source: 'apilint',
  message: "'minLength' must be a lower value than 'maxLength'",
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintSchemaMinimumMaximum',
  linterParams: ['minLength', 'maxLength'],
  marker: 'value',
  target: 'minLength',
  data: {},
  targetSpecs: [...OpenAPI2, ...OpenAPI30],
};

export default minLengthValueLint;
