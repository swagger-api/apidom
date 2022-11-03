import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const googlepubsubTypeLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI2_MESSAGE_BINDINGS_FIELD_GOOGLEPUBSUB_TYPE,
  source: 'apilint',
  message: '"googlepubsub" must be a GooglePubSub Message Binding',
  severity: 1,
  linterFunction: 'apilintElementOrClass',
  linterParams: ['googlepubsubMessageBinding'],
  marker: 'value',
  target: 'googlepubsub',
  data: {},
};

export default googlepubsubTypeLint;
