import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';
import { AsyncAPI2, AsyncAPI3 } from '../../../asyncapi/target-specs.ts';
import { OpenAPI2, OpenAPI3 } from '../../../openapi/target-specs.ts';

const maxLengthTypeLint: LinterMeta = {
  code: ApilintCodes.SCHEMA_MAXLENGTH,
  source: 'apilint',
  message: 'maxLength must be a non-negative integer',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintNumber',
  linterParams: [true, true, true],
  marker: 'value',
  target: 'maxLength',
  data: {},
  targetSpecs: [...AsyncAPI2, ...AsyncAPI3, ...OpenAPI2, ...OpenAPI3],
};

export default maxLengthTypeLint;
