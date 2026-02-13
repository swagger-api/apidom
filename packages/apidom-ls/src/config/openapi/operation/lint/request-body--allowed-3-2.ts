import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';
import { OpenAPI32 } from '../../target-specs.ts';

const requestBodyAllowed32Lint: LinterMeta = {
  code: ApilintCodes.OPENAPI3_2_OPERATION_FIELD_REQUEST_BODY_ALLOWED,
  source: 'apilint',
  message: "'requestBody' is not allowed for OPTIONS and TRACE operations",
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintOperationRequestBodyAllowed',
  // QUERY allowed per draft-ietf-httpbis-safe-method-w-body
  linterParams: [['GET', 'HEAD', 'DELETE', 'PUT', 'POST', 'PATCH', 'QUERY']],
  marker: 'key',
  markerTarget: 'requestBody',
  target: 'requestBody',
  data: {},
  targetSpecs: OpenAPI32,
};

export default requestBodyAllowed32Lint;
