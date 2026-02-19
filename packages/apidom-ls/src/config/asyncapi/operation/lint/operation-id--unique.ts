import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';
import { AsyncAPI2 } from '../../target-specs.ts';

const operationIdUniqueLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI2_OPERATION_FIELD_OPERATION_ID_UNIQUE,
  source: 'apilint',
  message: "operationId' must be unique among all operations",
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintPropertyUniqueValue',
  linterParams: [['operation', 'operationTrait'], 'operationId', 'propertyValues'],
  marker: 'key',
  markerTarget: 'operationId',
  target: 'operationId',
  data: {},
  targetSpecs: AsyncAPI2,
};

export default operationIdUniqueLint;
