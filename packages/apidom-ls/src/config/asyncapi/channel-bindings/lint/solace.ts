import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const solaceLint: LinterMeta = {
  code: ApilintCodes.CHANNEL_BINDING_SOLACE,
  source: 'apilint',
  message: '"solace" must be a Solace Channel Binding',
  severity: 1,
  linterFunction: 'apilintElementOrClass',
  linterParams: ['solaceChannelBinding'],
  marker: 'value',
  target: 'solace',
  data: {},
};

export default solaceLint;
