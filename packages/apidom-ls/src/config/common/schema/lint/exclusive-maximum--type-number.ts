import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';
import { AsyncAPI2, AsyncAPI3 } from '../../../asyncapi/target-specs.ts';
import { OpenAPI31 } from '../../../openapi/target-specs.ts';

const exclusiveMaximumTypeNumberLint: LinterMeta = {
  code: ApilintCodes.SCHEMA_EXCLUSIVEMAXIMUM,
  source: 'apilint',
  message: "'exclusiveMaximum' value must be a number",
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintNumber',
  linterParams: [false, false, true],
  marker: 'value',
  target: 'exclusiveMaximum',
  data: {},
  targetSpecs: [...AsyncAPI2, ...AsyncAPI3, ...OpenAPI31],
};

export default exclusiveMaximumTypeNumberLint;
