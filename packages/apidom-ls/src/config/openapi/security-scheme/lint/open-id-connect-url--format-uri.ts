import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';
import { OpenAPI3 } from '../../target-specs.ts';

const openIdConnectUrlFormatURILint: LinterMeta = {
  code: ApilintCodes.OPENAPI3_0_SECURITY_SCHEME_FIELD_OPEN_ID_CONNECT_URL_FORMAT_URI,
  source: 'apilint',
  message: 'openIdConnectUrl MUST be in the format of an absolute URL.',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintValidURI',
  linterParams: [true],
  marker: 'value',
  target: 'openIdConnectUrl',
  data: {},
  targetSpecs: OpenAPI3,
};

export default openIdConnectUrlFormatURILint;
