import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';
import { OpenAPI2, OpenAPI3 } from '../../target-specs.ts';

const operationIdUniqueLint: LinterMeta = {
  code: ApilintCodes.OPENAPI2_OPERATION_FIELD_OPERATION_ID_UNIQUE,
  source: 'apilint',
  message: "operationId' must be unique among all operations",
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintPropertyUniqueValue',
  linterParams: [['operation'], 'operationId'],
  marker: 'key',
  markerTarget: 'operationId',
  target: 'operationId',
  data: {},
  targetSpecs: [...OpenAPI2, ...OpenAPI3],
};

export default operationIdUniqueLint;
