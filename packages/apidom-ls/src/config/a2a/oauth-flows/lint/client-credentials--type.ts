import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';
import { A2A1 } from '../../target-specs.ts';

const lint: LinterMeta = {
  code: ApilintCodes.A2A1_OAUTH_FLOWS_FIELD_CLIENT_CREDENTIALS_TYPE,
  source: 'apilint',
  message: "'clientCredentials' must be a Client Credentials OAuth Flow Object",
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintElementOrClass',
  linterParams: ['clientCredentialsOAuthFlow'],
  marker: 'value',
  target: 'clientCredentials',
  targetSpecs: A2A1,
};

export default lint;
