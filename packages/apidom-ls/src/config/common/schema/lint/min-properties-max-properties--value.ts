import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';
import { OpenAPI2, OpenAPI3 } from '../../../openapi/target-specs.ts';

const minPropertiesValueLint: LinterMeta = {
  code: ApilintCodes.SCHEMA_MIN_PROPERTIES_VALUE,
  source: 'apilint',
  message: "'minProperties' must be a lower value than 'maxProperties'",
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintSchemaMinimumMaximum',
  linterParams: ['minProperties', 'maxProperties'],
  marker: 'value',
  target: 'minProperties',
  data: {},
  targetSpecs: [...OpenAPI2, ...OpenAPI3],
};

export default minPropertiesValueLint;
