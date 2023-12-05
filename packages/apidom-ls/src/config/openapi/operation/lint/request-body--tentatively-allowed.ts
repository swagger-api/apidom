import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';
import { OpenAPI3 } from '../../target-specs';

const requestBodyTentativelyAllowedLint: LinterMeta = {
  code: ApilintCodes.OPENAPI3_0_OPERATION_FIELD_REQUEST_BODY_TENTATIVELY_ALLOWED,
  source: 'apilint',
  message: 'requestBody does not have well-defined semantics for GET, HEAD and DELETE operations',
  severity: DiagnosticSeverity.Warning,
  linterFunction: 'apilintOperationRequestBodyAllowed',
  linterParams: [['PUT', 'POST', 'PATCH', 'OPTIONS', 'TRACE']],
  marker: 'key',
  markerTarget: 'requestBody',
  target: 'requestBody',
  data: {},
  targetSpecs: OpenAPI3,
};

export default requestBodyTentativelyAllowedLint;
