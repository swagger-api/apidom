import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';
import { A2A1 } from '../../target-specs.ts';

const lint: LinterMeta = {
  code: ApilintCodes.A2A1_OAUTH_FLOWS_FIELD_IMPLICIT_TYPE,
  source: 'apilint',
  message: "'implicit' must be an Implicit OAuth Flow Object",
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintElementOrClass',
  linterParams: ['implicitOAuthFlow'],
  marker: 'value',
  target: 'implicit',
  targetSpecs: A2A1,
};

export default lint;
