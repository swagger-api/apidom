import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';
import { A2A1 } from '../../target-specs.ts';

const flowsTypeLint: LinterMeta = {
  code: ApilintCodes.A2A1_OAUTH2_SECURITY_SCHEME_FIELD_FLOWS_TYPE,
  source: 'apilint',
  message: "'flows' must be an OAuth Flows Object",
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintElementOrClass',
  linterParams: ['oauthFlows'],
  marker: 'value',
  target: 'flows',
  targetSpecs: A2A1,
};

export default flowsTypeLint;
