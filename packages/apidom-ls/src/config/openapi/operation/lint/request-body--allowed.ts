import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';
import { OpenAPI3 } from '../../target-specs';

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
  targetSpecs: OpenAPI3,
};

export default requestBodyAllowedLint;
