import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const wsLint: LinterMeta = {
  code: ApilintCodes.CHANNEL_BINDING_WS,
  source: 'apilint',
  message: '"ws" must be a WebSockets Channel Binding',
  severity: 1,
  linterFunction: 'apilintElementOrClass',
  linterParams: ['wsChannelBinding'],
  marker: 'value',
  target: 'ws',
  data: {},
};

export default wsLint;
