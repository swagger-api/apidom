import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';
import { OpenAPI3 } from '../../target-specs.ts';

const authorizationUrlFormatURILint: LinterMeta = {
  code: ApilintCodes.OPENAPI3_0_OAUTH_FLOW_FIELD_AUTHORIZATION_URL_FORMAT_URI,
  source: 'apilint',
  message: "'authorizationUrl' value must be a valid URL",
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintValidURI',
  marker: 'value',
  target: 'authorizationUrl',
  data: {},
  targetSpecs: OpenAPI3,
};

export default authorizationUrlFormatURILint;
