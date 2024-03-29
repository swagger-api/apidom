import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';
import { AsyncAPI2 } from '../../../asyncapi/target-specs';
import { OpenAPI3 } from '../../../openapi/target-specs';

const writeOnlyTypeLint: LinterMeta = {
  code: ApilintCodes.SCHEMA_WRITEONLY,
  source: 'apilint',
  message: 'writeOnly must be a boolean',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintType',
  linterParams: ['boolean'],
  marker: 'value',
  target: 'writeOnly',
  data: {},
  targetSpecs: [...AsyncAPI2, ...OpenAPI3],
};

export default writeOnlyTypeLint;
