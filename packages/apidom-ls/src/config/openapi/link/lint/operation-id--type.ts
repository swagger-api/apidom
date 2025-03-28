import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';
import { OpenAPI3 } from '../../target-specs.ts';

const operationIdTypeLint: LinterMeta = {
  code: ApilintCodes.OPENAPI3_0_LINK_FIELD_OPERATION_ID_TYPE,
  source: 'apilint',
  message: "operationId' value must be a string",
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintType',
  linterParams: ['string'],
  marker: 'value',
  target: 'operationId',
  data: {},
  targetSpecs: OpenAPI3,
};

export default operationIdTypeLint;
