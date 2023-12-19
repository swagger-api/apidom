import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';
import { OpenAPI2, OpenAPI3 } from '../../target-specs';

const securityTypeLint: LinterMeta = {
  code: ApilintCodes.OPENAPI2_OPERATION_FIELD_SECURITY_TYPE,
  source: 'apilint',
  message: 'security must be an array',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintElementOrClass',
  linterParams: ['operation-security'],
  marker: 'value',
  target: 'security',
  data: {},
  targetSpecs: [...OpenAPI2, ...OpenAPI3],
};

export default securityTypeLint;
