import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';
import { OpenAPI2 } from '../../target-specs.ts';

// eslint-disable-next-line @typescript-eslint/naming-convention
const minItemsValue2_0Lint: LinterMeta = {
  code: ApilintCodes.OPENAPI2_ITEMS_FIELD_MIN_LENGTH_VALUE,
  source: 'apilint',
  message: "'minItems' must be a lower value than 'maxItems'",
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintSchemaMinimumMaximum',
  linterParams: ['minItems', 'maxItems'],
  marker: 'value',
  target: 'minItems',
  data: {},
  targetSpecs: OpenAPI2,
};

export default minItemsValue2_0Lint;
