import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';
import { OpenAPI32 } from '../../target-specs.ts';

const requestBodyTentativelyAllowed32Lint: LinterMeta = {
  code: ApilintCodes.OPENAPI3_2_OPERATION_FIELD_REQUEST_BODY_TENTATIVELY_ALLOWED,
  source: 'apilint',
  message: "'requestBody' does not have well-defined semantics for GET, HEAD and DELETE operations",
  severity: DiagnosticSeverity.Warning,
  linterFunction: 'apilintOperationRequestBodyAllowed',
  // QUERY has well-defined semantics in 3.2.0 (safe and idempotent with body)
  linterParams: [['PUT', 'POST', 'PATCH', 'OPTIONS', 'TRACE', 'QUERY']],
  marker: 'key',
  markerTarget: 'requestBody',
  target: 'requestBody',
  data: {},
  targetSpecs: OpenAPI32,
};

export default requestBodyTentativelyAllowed32Lint;
