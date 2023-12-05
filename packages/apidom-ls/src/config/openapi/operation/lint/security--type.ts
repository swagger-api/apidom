import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';
import { OpenAPI3 } from '../../target-specs';

const securityTypeLint: LinterMeta = {
  code: ApilintCodes.OPENAPI3_0_OPERATION_FIELD_SECURITY_TYPE,
  source: 'apilint',
  message: 'security must be an array',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintElementOrClass',
  linterParams: ['operation-security'],
  marker: 'value',
  target: 'security',
  data: {},
  targetSpecs: OpenAPI3,
};

export default securityTypeLint;
