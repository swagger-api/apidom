import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';
import { A2A1 } from '../../target-specs.ts';

const lint: LinterMeta = {
  code: ApilintCodes.A2A1_SECURITY_SCHEME_FIELD_API_KEY_TYPE,
  source: 'apilint',
  message: "'apiKeySecurityScheme' must be an API Key Security Scheme Object",
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintElementOrClass',
  linterParams: ['apiKeySecurityScheme'],
  marker: 'value',
  target: 'apiKeySecurityScheme',
  targetSpecs: A2A1,
};

export default lint;
