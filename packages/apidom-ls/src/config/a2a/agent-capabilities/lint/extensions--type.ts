import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';
import { A2A1 } from '../../target-specs.ts';

const lint: LinterMeta = {
  code: ApilintCodes.A2A1_AGENT_CAPABILITIES_FIELD_EXTENSIONS_TYPE,
  source: 'apilint',
  message: "'extensions' must be an array of Agent Extension Objects",
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintArrayOfElementsOrClasses',
  linterParams: [['agentExtension']],
  marker: 'value',
  target: 'extensions',
  targetSpecs: A2A1,
};

export default lint;
