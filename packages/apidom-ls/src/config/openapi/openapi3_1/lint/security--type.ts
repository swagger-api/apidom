import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';
import { OpenAPI31 } from '../../target-specs.ts';

const securityTypeLint: LinterMeta = {
  code: ApilintCodes.OPENAPI3_1_OPEN_API_FIELD_SECURITY_TYPE,
  source: 'apilint',
  message: 'security must be an array',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintElementOrClass',
  linterParams: [['security']],
  marker: 'value',
  target: 'security',
  data: {},
  targetSpecs: OpenAPI31,
};

export default securityTypeLint;
