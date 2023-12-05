import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';
import { OpenAPI3 } from '../../target-specs';

const securityItemsTypeLint: LinterMeta = {
  code: ApilintCodes.OPENAPI3_0_OPERATION_FIELD_SECURITY_VALUES_TYPE,
  source: 'apilint',
  message: 'security must be an array of Security Requirement Objects',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintArrayOfElementsOrClasses',
  linterParams: [['securityRequirement']],
  marker: 'key',
  target: 'security',
  data: {},
  targetSpecs: OpenAPI3,
};

export default securityItemsTypeLint;
