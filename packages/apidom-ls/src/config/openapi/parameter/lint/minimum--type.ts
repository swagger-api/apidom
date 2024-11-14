import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';
import { OpenAPI2 } from '../../target-specs.ts';

const minimumTypeLint: LinterMeta = {
  code: ApilintCodes.OPENAPI2_PARAMETER_FIELD_MINIMUM_TYPE,
  source: 'apilint',
  message: 'minimum must be a number',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintType',
  linterParams: ['number'],
  marker: 'value',
  target: 'minimum',
  data: {},
  targetSpecs: OpenAPI2,
};

export default minimumTypeLint;
