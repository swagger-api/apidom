import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';
import { OpenAPI2 } from '../../target-specs.ts';

// eslint-disable-next-line @typescript-eslint/naming-convention
const minimumValue2_0Lint: LinterMeta = {
  code: ApilintCodes.OPENAPI2_ITEMS_FIELD_MINIMUM_VALUE,
  source: 'apilint',
  message: "'minimum' must be a lower value than 'maximum'",
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintSchemaMinimumMaximum',
  linterParams: ['minimum', 'maximum'],
  marker: 'value',
  target: 'minimum',
  data: {},
  targetSpecs: OpenAPI2,
};

export default minimumValue2_0Lint;
