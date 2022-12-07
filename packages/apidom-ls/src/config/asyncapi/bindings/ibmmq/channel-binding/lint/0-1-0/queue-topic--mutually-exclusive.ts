import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../../../../codes';
import { LinterMeta } from '../../../../../../../apidom-language-types';

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
      targets: [{ path: 'bindingVersion' }],
      function: 'apilintValueOrArray',
      params: [['0.1.0']],
    },
  ],
};

export default queueTopicMutuallyExclusiveLint;
