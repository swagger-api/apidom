import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';
import { OpenAPI3 } from '../../target-specs.ts';

const allowEmptyValueTypeLint: LinterMeta = {
  code: ApilintCodes.OPENAPI3_0_HEADER_FIELD_ALLOW_EMPTY_VALUE_TYPE,
  source: 'apilint',
  message: 'allowEmptyValue must be a boolean',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintType',
  linterParams: ['boolean'],
  marker: 'value',
  target: 'allowEmptyValue',
  data: {},
  targetSpecs: OpenAPI3,
};

export default allowEmptyValueTypeLint;
