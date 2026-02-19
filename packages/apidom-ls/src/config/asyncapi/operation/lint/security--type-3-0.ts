import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';
import { AsyncAPI3 } from '../../target-specs.ts';

// eslint-disable-next-line @typescript-eslint/naming-convention
const securityType3_0Lint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI3_OPERATION_FIELD_SECURITY_TYPE,
  source: 'apilint',
  message: 'security must be an array',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintElementOrClass',
  linterParams: [['operation-security']],
  marker: 'key',
  target: 'security',
  data: {},
  targetSpecs: AsyncAPI3,
};

export default securityType3_0Lint;
