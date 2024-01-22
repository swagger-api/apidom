import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';
import { AsyncAPI2 } from '../../../asyncapi/target-specs';
import { OpenAPI2, OpenAPI3 } from '../../../openapi/target-specs';

const minItemsTypeLint: LinterMeta = {
  code: ApilintCodes.SCHEMA_MINITEMS,
  source: 'apilint',
  message: 'minItems must be a non-negative integer',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintNumber',
  linterParams: [true, true, true],
  marker: 'value',
  target: 'minItems',
  data: {},
  targetSpecs: [...AsyncAPI2, ...OpenAPI2, ...OpenAPI3],
};

export default minItemsTypeLint;
