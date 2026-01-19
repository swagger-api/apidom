import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';
import { AsyncAPI2, AsyncAPI3 } from '../../target-specs.ts';

const clientCredentialsTypeLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI2_OAUTH_FLOWS_FIELD_CLIENT_CREDENTIALS_TYPE,
  source: 'apilint',
  message: "'clientCredentials' must be an object",
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintElementOrClass',
  linterParams: [['oAuthFlow']],
  marker: 'value',
  target: 'clientCredentials',
  data: {},
  targetSpecs: [...AsyncAPI2, ...AsyncAPI3],
};

export default clientCredentialsTypeLint;
