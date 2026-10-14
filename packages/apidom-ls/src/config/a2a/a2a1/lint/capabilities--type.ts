import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';
import { A2A1 } from '../../target-specs.ts';

const lint: LinterMeta = {
  code: ApilintCodes.A2A1_AGENT_CARD_FIELD_CAPABILITIES_TYPE,
  source: 'apilint',
  message: "'capabilities' must be an Agent Capabilities Object",
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintElementOrClass',
  linterParams: ['agentCapabilities'],
  marker: 'value',
  target: 'capabilities',
  targetSpecs: A2A1,
};

export default lint;
