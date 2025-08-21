import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';
import { OpenAPI2, OpenAPI30 } from '../../../openapi/target-specs.ts';

const minItemsValueLint: LinterMeta = {
  code: ApilintCodes.SCHEMA_MIN_ITEMS_VALUE,
  source: 'apilint',
  message: "'minItems' must be a lower value than 'maxItems'",
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintSchemaMinimumMaximum',
  linterParams: ['minItems', 'maxItems'],
  marker: 'value',
  target: 'minItems',
  data: {},
  targetSpecs: [...OpenAPI2, ...OpenAPI30],
};

export default minItemsValueLint;
