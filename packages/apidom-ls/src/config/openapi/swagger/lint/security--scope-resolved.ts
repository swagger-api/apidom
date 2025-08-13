import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';
import { OpenAPI2 } from '../../target-specs.ts';

const securityTypeLint: LinterMeta = {
  code: ApilintCodes.OPENAPI2_SECURITY_SCHEME_FIELD_SCOPES_RESOLVED,
  source: 'apilint',
  message: 'Security scope could not be resolved',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintSecurityScopeResolved',
  marker: 'value',
  target: 'security',
  targetSpecs: OpenAPI2,
};

export default securityTypeLint;
