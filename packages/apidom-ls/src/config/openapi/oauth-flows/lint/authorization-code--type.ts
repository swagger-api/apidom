import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';
import { OpenAPI3 } from '../../target-specs';

const authorizationCodeTypeLint: LinterMeta = {
  code: ApilintCodes.OPENAPI3_0_OAUTH_FLOWS_FIELD_AUTHORIZATION_CODE_TYPE,
  source: 'apilint',
  message: "'authorizationCode' must be an object",
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintElementOrClass',
  linterParams: [['oAuthFlow']],
  marker: 'value',
  target: 'authorizationCode',
  data: {},
  targetSpecs: OpenAPI3,
};

export default authorizationCodeTypeLint;
