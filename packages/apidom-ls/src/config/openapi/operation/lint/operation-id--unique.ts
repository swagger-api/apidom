import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';
import { OpenAPI3 } from '../../target-specs';

const operationIdUniqueLint: LinterMeta = {
  code: ApilintCodes.OPENAPI3_0_OPERATION_FIELD_OPERATION_ID_UNIQUE,
  source: 'apilint',
  message: "operationId' must be unique among all operations",
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintPropertyUniqueValue',
  linterParams: [['operation'], 'operationId'],
  marker: 'key',
  markerTarget: 'operationId',
  target: 'operationId',
  data: {},
  targetSpecs: OpenAPI3,
};

export default operationIdUniqueLint;
