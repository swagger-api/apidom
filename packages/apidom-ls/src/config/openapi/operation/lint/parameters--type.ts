import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';
import { OpenAPI2, OpenAPI3 } from '../../target-specs';

const parametersTypeLint: LinterMeta = {
  code: ApilintCodes.OPENAPI2_OPERATION_FIELD_PARAMETERS_TYPE,
  source: 'apilint',
  message: 'parameters must be an array',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintElementOrClass',
  linterParams: [['operation-parameters']],
  marker: 'value',
  target: 'parameters',
  data: {},
  targetSpecs: [...OpenAPI2, ...OpenAPI3],
};

export default parametersTypeLint;
