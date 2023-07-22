import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const requestBodyGetHeadDeleteLint: LinterMeta = {
  code: ApilintCodes.OPENAPI3_0_REQUEST_BODY_GET_HEAD_DELETE,
  source: 'apilint',
  message: 'requestBody does not have well-defined semantics for GET, HEAD and DELETE operations',
  severity: DiagnosticSeverity.Warning,
  linterFunction: 'apilintOperationRequestBody_GET_HEAD_DELETE',
  marker: 'key',
  markerTarget: 'requestBody',
  target: 'requestBody',
  data: {},
};

export default requestBodyGetHeadDeleteLint;
