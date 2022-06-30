import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const ibmmqTypeLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI2_CHANNEL_BINDINGS_FIELD_IBMMQ_TYPE,
  source: 'apilint',
  message: '"ibmmq" must be a IBM MQ Channel Binding',
  severity: 1,
  linterFunction: 'apilintElementOrClass',
  linterParams: ['ibmmqChannelBinding'],
  marker: 'value',
  target: 'ibmmq',
  data: {},
};

export default ibmmqTypeLint;
