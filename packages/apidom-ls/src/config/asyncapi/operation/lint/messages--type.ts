import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';
import { AsyncAPI3 } from '../../target-specs.ts';

const messagesTypeLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI3_OPERATION_FIELD_MESSAGES_TYPE,
  source: 'apilint',
  message: "'messages' must be an array",
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintElementOrClass',
  linterParams: [['messages']],
  marker: 'value',
  target: 'messages',
  data: {},
  targetSpecs: AsyncAPI3,
};

export default messagesTypeLint;
