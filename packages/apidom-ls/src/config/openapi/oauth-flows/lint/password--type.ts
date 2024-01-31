import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';
import { OpenAPI3 } from '../../target-specs';

const passwordTypeLint: LinterMeta = {
  code: ApilintCodes.OPENAPI3_0_OAUTH_FLOWS_FIELD_PASSWORD_TYPE,
  source: 'apilint',
  message: "'password' must be an object",
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintElementOrClass',
  linterParams: [['oAuthFlow']],
  marker: 'value',
  target: 'password',
  data: {},
  targetSpecs: OpenAPI3,
};

export default passwordTypeLint;
