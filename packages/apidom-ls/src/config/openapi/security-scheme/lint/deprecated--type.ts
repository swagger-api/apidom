import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';
import { OpenAPI32 } from '../../target-specs.ts';

const deprecatedTypeLint: LinterMeta = {
  code: ApilintCodes.OPENAPI3_2_SECURITY_SCHEME_FIELD_DEPRECATED_TYPE,
  source: 'apilint',
  message: 'deprecated must be a boolean',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintType',
  linterParams: ['boolean'],
  marker: 'value',
  target: 'deprecated',
  data: {},
  targetSpecs: OpenAPI32,
};

export default deprecatedTypeLint;
