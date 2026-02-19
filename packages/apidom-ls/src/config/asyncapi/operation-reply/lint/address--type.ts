import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';
import { AsyncAPI3 } from '../../target-specs.ts';

const addressTypeLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI3_OPERATION_REPLY_FIELD_ADDRESS_TYPE,
  source: 'apilint',
  message: "'address' must be an object",
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintElementOrClass',
  linterParams: [['operationReplyAddress']],
  marker: 'value',
  target: 'address',
  data: {},
  targetSpecs: AsyncAPI3,
};

export default addressTypeLint;
