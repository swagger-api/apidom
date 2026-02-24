import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';
import { OpenAPI32 } from '../../target-specs.ts';

const deviceAuthorizationTypeLint: LinterMeta = {
  code: ApilintCodes.OPENAPI3_2_OAUTH_FLOWS_FIELD_DEVICE_AUTHORIZATION_TYPE,
  source: 'apilint',
  message: "'deviceAuthorization' must be an OAuth Flow Object",
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintElementOrClass',
  linterParams: [['oAuthFlow']],
  marker: 'value',
  target: 'deviceAuthorization',
  data: {},
  targetSpecs: OpenAPI32,
};

export default deviceAuthorizationTypeLint;
