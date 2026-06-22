import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';
import { A2A1 } from '../../target-specs.ts';

const lint: LinterMeta = {
  code: ApilintCodes.A2A1_AGENT_INTERFACE_FIELD_TENANT_TYPE,
  source: 'apilint',
  message: "'tenant' must be a string",
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintType',
  linterParams: ['string'],
  marker: 'value',
  target: 'tenant',
  targetSpecs: A2A1,
};

export default lint;
