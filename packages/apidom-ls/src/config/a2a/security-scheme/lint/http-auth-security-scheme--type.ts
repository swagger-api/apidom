import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';
import { A2A1 } from '../../target-specs.ts';

const lint: LinterMeta = {
  code: ApilintCodes.A2A1_SECURITY_SCHEME_FIELD_HTTP_AUTH_TYPE,
  source: 'apilint',
  message: "'httpAuthSecurityScheme' must be an HTTP Auth Security Scheme Object",
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintElementOrClass',
  linterParams: ['httpAuthSecurityScheme'],
  marker: 'value',
  target: 'httpAuthSecurityScheme',
  targetSpecs: A2A1,
};

export default lint;
