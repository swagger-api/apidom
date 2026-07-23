import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';
import { A2A1 } from '../../target-specs.ts';

const paramsTypeLint: LinterMeta = {
  code: ApilintCodes.A2A1_AGENT_EXTENSION_FIELD_PARAMS_TYPE,
  source: 'apilint',
  message: "'params' must be an object",
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintType',
  linterParams: ['object'],
  marker: 'value',
  target: 'params',
  targetSpecs: A2A1,
};

export default paramsTypeLint;
