import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';

const sqsTypeLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI2_MESSAGE_BINDINGS_FIELD_SQS_TYPE,
  source: 'apilint',
  message: '"sqs" must be a SQS Message Binding',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintElementOrClass',
  linterParams: [['sqsMessageBinding']],
  marker: 'value',
  target: 'sqs',
  data: {},
};

export default sqsTypeLint;
