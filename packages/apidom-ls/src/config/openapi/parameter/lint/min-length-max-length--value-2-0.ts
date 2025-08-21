import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';
import { OpenAPI2 } from '../../target-specs.ts';

// eslint-disable-next-line @typescript-eslint/naming-convention
const minLengthValue2_0Lint: LinterMeta = {
  code: ApilintCodes.OPENAPI2_ITEMS_FIELD_MIN_ITEMS_VALUE,
  source: 'apilint',
  message: "'minLength' must be a lower value than 'maxLength'",
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintSchemaMinimumMaximum',
  linterParams: ['minLength', 'maxLength'],
  marker: 'value',
  target: 'minLength',
  data: {},
  targetSpecs: OpenAPI2,
};

export default minLengthValue2_0Lint;
