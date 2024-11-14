import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';
import { OpenAPI2 } from '../../target-specs.ts';

const tokenUrlFormatURILint: LinterMeta = {
  code: ApilintCodes.OPENAPI2_SECURITY_SCHEME_FIELD_TOKEN_URL_FORMAT_URI,
  source: 'apilint',
  message: 'tokenUrl MUST be in the format of an absolute URL.',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintValidURI',
  linterParams: [true],
  marker: 'value',
  target: 'tokenUrl',
  data: {},
  targetSpecs: OpenAPI2,
};

export default tokenUrlFormatURILint;
