import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';
import { A2A1 } from '../../target-specs.ts';

const lint: LinterMeta = {
  code: ApilintCodes.A2A1_SECURITY_SCHEME_FIELD_OPEN_ID_CONNECT_TYPE,
  source: 'apilint',
  message: "'openIdConnectSecurityScheme' must be an OpenID Connect Security Scheme Object",
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintElementOrClass',
  linterParams: ['openIdConnectSecurityScheme'],
  marker: 'value',
  target: 'openIdConnectSecurityScheme',
  targetSpecs: A2A1,
};

export default lint;
