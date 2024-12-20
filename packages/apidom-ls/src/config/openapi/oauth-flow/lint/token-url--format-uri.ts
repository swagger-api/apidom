import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';
import { OpenAPI3 } from '../../target-specs.ts';

const tokenUrlFormatURILint: LinterMeta = {
  code: ApilintCodes.OPENAPI3_0_OAUTH_FLOW_FIELD_TOKEN_URL_FORMAT_URI,
  source: 'apilint',
  message: "'tokenUrl' value must be a valid URL",
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintValidURI',
  marker: 'value',
  target: 'tokenUrl',
  data: {},
  targetSpecs: OpenAPI3,
};

export default tokenUrlFormatURILint;
