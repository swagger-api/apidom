import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const natsLint: LinterMeta = {
  code: ApilintCodes.CHANNEL_BINDING_NATS,
  source: 'apilint',
  message: '"nats" must be a NATS Channel Binding',
  severity: 1,
  linterFunction: 'apilintElementOrClass',
  linterParams: ['natsChannelBinding'],
  marker: 'value',
  target: 'nats',
  data: {},
};

export default natsLint;
