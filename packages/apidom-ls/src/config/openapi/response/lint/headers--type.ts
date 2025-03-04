import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';
import { OpenAPI2 } from '../../target-specs.ts';

const headersTypeLint: LinterMeta = {
  code: ApilintCodes.OPENAPI2_RESPONSE_FIELD_HEADERS_TYPE,
  source: 'apilint',
  message: '"headers" must be an object',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintElementOrClass',
  linterParams: [['headers']],
  marker: 'key',
  markerTarget: 'headers',
  target: 'headers',
  data: {},
  targetSpecs: OpenAPI2,
};

export default headersTypeLint;
