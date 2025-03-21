import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../../../../codes.ts';
import { LinterMeta } from '../../../../../../../apidom-language-types.ts';

const queueTopicMutuallyExclusiveLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI2_IBMMQ_CHANNEL_BINDING_FIELD_QUEUE_TOPIC_MUTUALLY_EXCLUSIVE,
  source: 'apilint',
  message: 'The `queue` field and `topic` field are mutually exclusive.',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'missingFields',
  linterParams: [['topic']],
  marker: 'key',
  markerTarget: 'topic',
  conditions: [
    {
      function: 'existFields',
      params: [['queue']],
    },
    {
      function: 'missingField',
      params: ['bindingVersion'],
    },
  ],
};

export default queueTopicMutuallyExclusiveLint;
