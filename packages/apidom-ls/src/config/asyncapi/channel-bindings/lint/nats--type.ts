import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const natsTypeLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI2_CHANNEL_BINDINGS_FIELD_NATS_TYPE,
  source: 'apilint',
  message: '"nats" must be a NATS Channel Binding',
  severity: 1,
  linterFunction: 'apilintElementOrClass',
  linterParams: ['natsChannelBinding'],
  marker: 'value',
  target: 'nats',
  data: {},
};

export default natsTypeLint;
