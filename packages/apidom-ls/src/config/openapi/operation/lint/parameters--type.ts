import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';
import { OpenAPI3 } from '../../target-specs';

const parametersTypeLint: LinterMeta = {
  code: ApilintCodes.OPENAPI3_0_OPERATION_FIELD_PARAMETERS_TYPE,
  source: 'apilint',
  message: 'parameters must be an array',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintElementOrClass',
  linterParams: ['operation-parameters'],
  marker: 'value',
  target: 'parameters',
  data: {},
  targetSpecs: OpenAPI3,
};

export default parametersTypeLint;
