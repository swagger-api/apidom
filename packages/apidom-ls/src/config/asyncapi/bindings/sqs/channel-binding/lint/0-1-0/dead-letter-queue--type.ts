import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../../../../codes.ts';
import { LinterMeta } from '../../../../../../../apidom-language-types.ts';

const deadLetterQueueTypeLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI2_SQS_CHANNEL_BINDING_FIELD_DEAD_LETTER_QUEUE_TYPE,
  source: 'apilint',
  message: "'deadLetterQueue' value must be an object",
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintType',
  linterParams: ['object'],
  marker: 'value',
  target: 'deadLetterQueue',
  data: {},
  conditions: [
    {
      targets: [{ path: 'bindingVersion' }],
      function: 'apilintValueOrArray',
      params: [['0.1.0']],
    },
  ],
};

export default deadLetterQueueTypeLint;
