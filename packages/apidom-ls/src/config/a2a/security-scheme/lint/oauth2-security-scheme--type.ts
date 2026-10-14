import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';
import { A2A1 } from '../../target-specs.ts';

const lint: LinterMeta = {
  code: ApilintCodes.A2A1_SECURITY_SCHEME_FIELD_OAUTH2_TYPE,
  source: 'apilint',
  message: "'oauth2SecurityScheme' must be an OAuth 2.0 Security Scheme Object",
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintElementOrClass',
  linterParams: ['oauth2SecurityScheme'],
  marker: 'value',
  target: 'oauth2SecurityScheme',
  targetSpecs: A2A1,
};

export default lint;
