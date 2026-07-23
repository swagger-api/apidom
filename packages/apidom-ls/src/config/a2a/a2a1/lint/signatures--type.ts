import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';
import { A2A1 } from '../../target-specs.ts';

const lint: LinterMeta = {
  code: ApilintCodes.A2A1_AGENT_CARD_FIELD_SIGNATURES_TYPE,
  source: 'apilint',
  message: "'signatures' must be an array of Agent Card Signature Objects",
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintArrayOfElementsOrClasses',
  linterParams: [['agentCardSignature']],
  marker: 'value',
  target: 'signatures',
  targetSpecs: A2A1,
};

export default lint;
