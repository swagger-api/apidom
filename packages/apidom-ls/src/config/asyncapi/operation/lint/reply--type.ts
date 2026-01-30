import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';
import { AsyncAPI3 } from '../../target-specs.ts';

const replyTypeLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI3_OPERATION_FIELD_REPLY_TYPE,
  source: 'apilint',
  message: 'reply must be an object',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintElementOrClass',
  linterParams: [['operationReply']],
  marker: 'value',
  target: 'reply',
  data: {},
  targetSpecs: AsyncAPI3,
};

export default replyTypeLint;
