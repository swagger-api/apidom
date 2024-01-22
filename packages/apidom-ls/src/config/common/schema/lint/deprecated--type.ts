import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';
import { AsyncAPI2 } from '../../../asyncapi/target-specs';
import { OpenAPI3 } from '../../../openapi/target-specs';

const deprecatedTypeLint: LinterMeta = {
  code: ApilintCodes.SCHEMA_READONLY,
  source: 'deprecated',
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
