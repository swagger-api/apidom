import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const googlepubsubTypeLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI2_CHANNEL_BINDINGS_FIELD_GOOGLEPUBSUB_TYPE,
  source: 'apilint',
  message: '"googlepubsub" must be a Google Cloud Pub/Sub Channel Binding',
  severity: 1,
  linterFunction: 'apilintElementOrClass',
  linterParams: ['googlepubsubChannelBinding'],
  marker: 'value',
  target: 'googlepubsub',
  data: {},
  targetSpecs: [{ namespace: 'asyncapi', version: '2.5.0' }],
};

export default googlepubsubTypeLint;
