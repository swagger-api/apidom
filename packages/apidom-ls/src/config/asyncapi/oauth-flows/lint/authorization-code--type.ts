import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';
import { AsyncAPI2, AsyncAPI3 } from '../../target-specs.ts';

const authorizationCodeTypeLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI2_OAUTH_FLOWS_FIELD_AUTHORIZATION_CODE_TYPE,
  source: 'apilint',
  message: "'authorizationCode' must be an object",
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintElementOrClass',
  linterParams: [['oAuthFlow']],
  marker: 'value',
  target: 'authorizationCode',
  data: {},
  targetSpecs: [...AsyncAPI2, ...AsyncAPI3],
};

export default authorizationCodeTypeLint;
