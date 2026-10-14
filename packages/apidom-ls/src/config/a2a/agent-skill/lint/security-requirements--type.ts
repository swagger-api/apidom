import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';
import { A2A1 } from '../../target-specs.ts';

const lint: LinterMeta = {
  code: ApilintCodes.A2A1_AGENT_SKILL_FIELD_SECURITY_REQUIREMENTS_TYPE,
  source: 'apilint',
  message: "'securityRequirements' must be an array of Security Requirement Objects",
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintArrayOfElementsOrClasses',
  linterParams: [['securityRequirement']],
  marker: 'value',
  target: 'securityRequirements',
  targetSpecs: A2A1,
};

export default lint;
