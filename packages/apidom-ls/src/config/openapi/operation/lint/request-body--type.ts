import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';
import { OpenAPI3 } from '../../target-specs.ts';

const requestBodyTypeLint: LinterMeta = {
  code: ApilintCodes.OPENAPI3_0_OPERATION_FIELD_REQUEST_BODY_TYPE,
  source: 'apilint',
  message: 'requestBody must be an object',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintElementOrClass',
  linterParams: [['requestBody']],
  marker: 'value',
  target: 'requestBody',
  data: {},
  targetSpecs: OpenAPI3,
};

export default requestBodyTypeLint;
