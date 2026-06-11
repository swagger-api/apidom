import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';
import { A2A1 } from '../../target-specs.ts';

const requiredTypeLint: LinterMeta = {
  code: ApilintCodes.A2A1_AGENT_EXTENSION_FIELD_REQUIRED_TYPE,
  source: 'apilint',
  message: "'required' must be a boolean",
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintType',
  linterParams: ['boolean'],
  marker: 'value',
  target: 'required',
  targetSpecs: A2A1,
};

export default requiredTypeLint;
