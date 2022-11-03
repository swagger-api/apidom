import ApilintCodes from '../../../../../../codes';
import { LinterMeta } from '../../../../../../../apidom-language-types';

const queueTopicMutuallyExclusiveLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI2_IBMMQ_CHANNEL_BINDING_FIELD_QUEUE_TOPIC_MUTUALLY_EXCLUSIVE,
  source: 'apilint',
  message: 'The `queue` field and `topic` field are mutually exclusive.',
  severity: 1,
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
