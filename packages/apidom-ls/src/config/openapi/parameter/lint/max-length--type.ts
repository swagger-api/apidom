import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';
import { OpenAPI2 } from '../../target-specs';

const maxLengthTypeLint: LinterMeta = {
  code: ApilintCodes.OPENAPI2_PARAMETER_FIELD_MAX_LENGTH_TYPE,
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
