import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';
import { AsyncAPI2 } from '../../target-specs.ts';

const operationIdTypeLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI2_OPERATION_FIELD_OPERATION_ID_TYPE,
  source: 'apilint',
  message: "operationId' value must be a string",
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintType',
  linterParams: ['string'],
  marker: 'value',
  target: 'operationId',
  data: {},
  targetSpecs: AsyncAPI2,
};

export default operationIdTypeLint;
