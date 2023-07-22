import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const requestBodyOptionsTraceLint: LinterMeta = {
  code: ApilintCodes.OPENAPI3_0_REQUEST_BODY_OPTIONS_TRACE,
  source: 'apilint',
  message: 'requestBody is not allowed for OPTIONS and TRACE operations',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintOperationRequestBody_OPTIONS_TRACE',
  marker: 'key',
  markerTarget: 'requestBody',
  target: 'requestBody',
  data: {},
};

export default requestBodyOptionsTraceLint;
