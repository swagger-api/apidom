import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';
import { AsyncAPI2, AsyncAPI3 } from '../../../asyncapi/target-specs.ts';
import { OpenAPI2, OpenAPI3 } from '../../../openapi/target-specs.ts';

const additionalPropertiesTypeLint: LinterMeta = {
  code: ApilintCodes.SCHEMA_ADDITIONALPROPERTIES,
  source: 'apilint',
  message: 'additionalProperties must be a Schema or a Boolean',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintElementOrClass',
  linterParams: [['schema', 'boolean']],
  marker: 'value',
  target: 'additionalProperties',
  data: {},
  targetSpecs: [...AsyncAPI2, ...AsyncAPI3, ...OpenAPI2, ...OpenAPI3],
};

export default additionalPropertiesTypeLint;
