import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';
import { OpenAPI2 } from '../../target-specs.ts';

const valuesResolved20Lint: LinterMeta = {
  code: ApilintCodes.OPENAPI2_SECURITY_SCHEME_FIELD_SCOPES_TYPE,
  source: 'apilint',
  message: 'Security scope definition could not be resolved',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintSecurityScopeResolved',
  marker: 'value',
  targetSpecs: OpenAPI2,
};

export default valuesResolved20Lint;
