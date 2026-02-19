import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';
import { AsyncAPI3 } from '../../target-specs.ts';

const operationsTypeLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI3_ASYNC_API_FIELD_OPERATIONS_TYPE,
  source: 'apilint',
  message: 'operations must be an object',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintElementOrClass',
  linterParams: [['operations']],
  marker: 'value',
  target: 'operations',
  data: {},
  targetSpecs: AsyncAPI3,
};

export default operationsTypeLint;
