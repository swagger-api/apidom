import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';

const sqsTypeLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI2_CHANNEL_BINDINGS_FIELD_SQS_TYPE,
  source: 'apilint',
  message: '"sqs" must be a SQS Channel Binding',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintElementOrClass',
  linterParams: [['sqsChannelBinding']],
  marker: 'value',
  target: 'sqs',
  data: {},
};

export default sqsTypeLint;
