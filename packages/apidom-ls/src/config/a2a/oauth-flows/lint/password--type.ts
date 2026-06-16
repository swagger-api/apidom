import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';
import { A2A1 } from '../../target-specs.ts';

const lint: LinterMeta = {
  code: ApilintCodes.A2A1_OAUTH_FLOWS_FIELD_PASSWORD_TYPE,
  source: 'apilint',
  message: "'password' must be a Password OAuth Flow Object",
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintElementOrClass',
  linterParams: ['passwordOAuthFlow'],
  marker: 'value',
  target: 'password',
  targetSpecs: A2A1,
};

export default lint;
