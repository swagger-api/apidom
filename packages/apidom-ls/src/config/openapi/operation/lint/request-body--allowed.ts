import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';
import { OpenAPI30, OpenAPI31 } from '../../target-specs.ts';

const requestBodyAllowedLint: LinterMeta = {
  code: ApilintCodes.OPENAPI3_0_OPERATION_FIELD_REQUEST_BODY_ALLOWED,
  source: 'apilint',
  message: 'requestBody is not allowed for OPTIONS and TRACE operations',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintOperationRequestBodyAllowed',
  linterParams: [['GET', 'HEAD', 'DELETE', 'PUT', 'POST', 'PATCH']],
  marker: 'key',
  markerTarget: 'requestBody',
  target: 'requestBody',
  data: {},
  targetSpecs: [...OpenAPI30, ...OpenAPI31],
};

export default requestBodyAllowedLint;
