import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';
import { A2A1 } from '../../target-specs.ts';

const lint: LinterMeta = {
  code: ApilintCodes.A2A1_AGENT_CARD_FIELD_SUPPORTED_INTERFACES_TYPE,
  source: 'apilint',
  message: "'supportedInterfaces' must be an array of Agent Interface Objects",
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintArrayOfElementsOrClasses',
  linterParams: [['agentInterface']],
  marker: 'value',
  target: 'supportedInterfaces',
  targetSpecs: A2A1,
};

export default lint;
