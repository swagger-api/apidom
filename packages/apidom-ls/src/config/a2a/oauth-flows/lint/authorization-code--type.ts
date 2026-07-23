import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';
import { A2A1 } from '../../target-specs.ts';

const lint: LinterMeta = {
  code: ApilintCodes.A2A1_OAUTH_FLOWS_FIELD_AUTHORIZATION_CODE_TYPE,
  source: 'apilint',
  message: "'authorizationCode' must be an Authorization Code OAuth Flow Object",
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintElementOrClass',
  linterParams: ['authorizationCodeOAuthFlow'],
  marker: 'value',
  target: 'authorizationCode',
  targetSpecs: A2A1,
};

export default lint;
