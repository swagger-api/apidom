import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';
import { A2A1 } from '../../target-specs.ts';

const lint: LinterMeta = {
  code: ApilintCodes.A2A1_AGENT_CARD_FIELD_SKILLS_TYPE,
  source: 'apilint',
  message: "'skills' must be an array of Agent Skill Objects",
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintArrayOfElementsOrClasses',
  linterParams: [['agentSkill']],
  marker: 'value',
  target: 'skills',
  targetSpecs: A2A1,
};

export default lint;
