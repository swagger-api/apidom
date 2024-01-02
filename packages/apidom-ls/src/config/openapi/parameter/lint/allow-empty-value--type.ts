import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';
import { OpenAPI2, OpenAPI3 } from '../../target-specs';

const allowEmptyValueTypeLint: LinterMeta = {
  code: ApilintCodes.OPENAPI2_PARAMETER_FIELD_ALLOW_EMPTY_VALUE_TYPE,
  source: 'apilint',
  message: 'allowEmptyValue must be a boolean',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintType',
  linterParams: ['boolean'],
  marker: 'value',
  target: 'allowEmptyValue',
  data: {},
  targetSpecs: [...OpenAPI2, ...OpenAPI3],
};

export default allowEmptyValueTypeLint;
