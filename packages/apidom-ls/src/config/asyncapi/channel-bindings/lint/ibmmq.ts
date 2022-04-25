import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const ibmmqLint: LinterMeta = {
  code: ApilintCodes.CHANNEL_BINDING_IBMMQ,
  source: 'apilint',
  message: '"ibmmq" must be a IBM MQ Channel Binding',
  severity: 1,
  linterFunction: 'apilintElementOrClass',
  linterParams: ['ibmmqChannelBinding'],
  marker: 'value',
  target: 'ibmmq',
  data: {},
};

export default ibmmqLint;
