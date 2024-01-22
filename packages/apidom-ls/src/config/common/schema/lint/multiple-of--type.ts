import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';
import { AsyncAPI2 } from '../../../asyncapi/target-specs';
import { OpenAPI2, OpenAPI3 } from '../../../openapi/target-specs';

const multipleOfTypeLint: LinterMeta = {
  code: ApilintCodes.SCHEMA_MULTIPLEOF,
  source: 'apilint',
  message: "multipleOf' value must be a number > 0",
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintNumber',
  linterParams: [false, true, false],
  marker: 'value',
  target: 'multipleOf',
  data: {},
  targetSpecs: [...AsyncAPI2, ...OpenAPI2, ...OpenAPI3],
};

export default multipleOfTypeLint;
