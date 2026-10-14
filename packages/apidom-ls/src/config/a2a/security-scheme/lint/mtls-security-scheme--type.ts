import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';
import { A2A1 } from '../../target-specs.ts';

const lint: LinterMeta = {
  code: ApilintCodes.A2A1_SECURITY_SCHEME_FIELD_MTLS_TYPE,
  source: 'apilint',
  message: "'mtlsSecurityScheme' must be a Mutual TLS Security Scheme Object",
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintElementOrClass',
  linterParams: ['mutualTlsSecurityScheme'],
  marker: 'value',
  target: 'mtlsSecurityScheme',
  targetSpecs: A2A1,
};

export default lint;
