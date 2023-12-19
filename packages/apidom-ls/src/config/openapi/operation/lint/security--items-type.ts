import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';
import { OpenAPI2, OpenAPI3 } from '../../target-specs';

const securityItemsTypeLint: LinterMeta = {
  code: ApilintCodes.OPENAPI2_OPERATION_FIELD_SECURITY_ITEMS_TYPE,
  source: 'apilint',
  message: 'security must be an array of Security Requirement Objects',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintArrayOfElementsOrClasses',
  linterParams: [['securityRequirement']],
  marker: 'key',
  target: 'security',
  data: {},
  targetSpecs: [...OpenAPI2, ...OpenAPI3],
};

export default securityItemsTypeLint;
