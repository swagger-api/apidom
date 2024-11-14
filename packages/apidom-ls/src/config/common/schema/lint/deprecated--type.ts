import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';
import { AsyncAPI2 } from '../../../asyncapi/target-specs.ts';
import { OpenAPI3 } from '../../../openapi/target-specs.ts';

const deprecatedTypeLint: LinterMeta = {
  code: ApilintCodes.SCHEMA_READONLY,
  source: 'apilint',
  message: 'deprecated must be a boolean',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintType',
  linterParams: ['boolean'],
  marker: 'value',
  target: 'deprecated',
  targetSpecs: [...AsyncAPI2, ...OpenAPI3],
  data: {},
};

export default deprecatedTypeLint;
