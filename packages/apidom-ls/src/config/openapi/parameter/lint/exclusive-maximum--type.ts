import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';
import { OpenAPI2 } from '../../target-specs.ts';

const exclusiveMaximumTypeLint: LinterMeta = {
  code: ApilintCodes.OPENAPI2_PARAMETER_FIELD_EXCLUSIVE_MAXIMUM_TYPE,
  source: 'apilint',
  message: 'exclusiveMaximum must be a boolean',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintType',
  linterParams: ['boolean'],
  marker: 'value',
  target: 'exclusiveMaximum',
  data: {},
  targetSpecs: OpenAPI2,
};

export default exclusiveMaximumTypeLint;
