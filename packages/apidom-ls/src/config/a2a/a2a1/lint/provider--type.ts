import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';
import { A2A1 } from '../../target-specs.ts';

const lint: LinterMeta = {
  code: ApilintCodes.A2A1_AGENT_CARD_FIELD_PROVIDER_TYPE,
  source: 'apilint',
  message: "'provider' must be an Agent Provider Object",
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintElementOrClass',
  linterParams: ['agentProvider'],
  marker: 'value',
  target: 'provider',
  targetSpecs: A2A1,
};

export default lint;
