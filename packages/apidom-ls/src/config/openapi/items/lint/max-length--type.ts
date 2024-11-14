import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';
import { OpenAPI2 } from '../../target-specs.ts';

const maxLengthTypeLint: LinterMeta = {
  code: ApilintCodes.OPENAPI2_ITEMS_FIELD_MAX_LENGTH_TYPE,
  source: 'apilint',
  message: 'maxLength must be an integer',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintNumber',
  linterParams: [true, true, true],
  marker: 'value',
  target: 'maxLength',
  data: {},
  targetSpecs: OpenAPI2,
};

export default maxLengthTypeLint;
