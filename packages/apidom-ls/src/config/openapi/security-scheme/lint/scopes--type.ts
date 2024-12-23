import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';
import { OpenAPI2 } from '../../target-specs.ts';

const scopesTypeLint: LinterMeta = {
  code: ApilintCodes.OPENAPI2_SECURITY_SCHEME_FIELD_SCOPES_TYPE,
  source: 'apilint',
  message: "'scopes' must be an object",
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintElementOrClass',
  linterParams: [['scopes']],
  marker: 'value',
  target: 'scopes',
  data: {},
  targetSpecs: OpenAPI2,
};

export default scopesTypeLint;
