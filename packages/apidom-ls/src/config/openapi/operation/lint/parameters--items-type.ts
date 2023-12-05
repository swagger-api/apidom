import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';
import { OpenAPI3 } from '../../target-specs';

const parametersItemsTypeLint: LinterMeta = {
  code: ApilintCodes.OPENAPI3_0_OPERATION_FIELD_PARAMETERS_ITEMS_TYPE,
  source: 'apilint',
  message: 'parameters must be an array of Parameter Objects',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintArrayOfElementsOrClasses',
  linterParams: [['parameter']],
  marker: 'key',
  target: 'parameters',
  data: {},
  targetSpecs: OpenAPI3,
};

export default parametersItemsTypeLint;
