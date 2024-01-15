import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';
import { OpenAPI2 } from '../../target-specs';

const multipleOfTypeLint: LinterMeta = {
  code: ApilintCodes.OPENAPI2_HEADER_FIELD_MULTIPLE_OF_TYPE,
  source: 'apilint',
  message: 'multipleOf must be a number',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintType',
  linterParams: ['number'],
  marker: 'value',
  target: 'multipleOf',
  data: {},
  targetSpecs: OpenAPI2,
};

export default multipleOfTypeLint;
