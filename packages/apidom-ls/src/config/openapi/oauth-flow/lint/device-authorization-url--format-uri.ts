import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';
import { OpenAPI32 } from '../../target-specs.ts';

const deviceAuthorizationUrlFormatURILint: LinterMeta = {
  code: ApilintCodes.OPENAPI3_2_OAUTH_FLOW_FIELD_DEVICE_AUTHORIZATION_URL_FORMAT_URI,
  source: 'apilint',
  message: "'deviceAuthorizationUrl' value must be a valid URL",
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintValidURI',
  marker: 'value',
  target: 'deviceAuthorizationUrl',
  data: {},
  targetSpecs: OpenAPI32,
};

export default deviceAuthorizationUrlFormatURILint;
