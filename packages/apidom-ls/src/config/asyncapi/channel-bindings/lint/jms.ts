import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const jmsLint: LinterMeta = {
  code: ApilintCodes.CHANNEL_BINDING_JMS,
  source: 'apilint',
  message: '"jms" must be a JMS Channel Binding',
  severity: 1,
  linterFunction: 'apilintElementOrClass',
  linterParams: ['httpChannelBinding'],
  marker: 'value',
  target: 'jms',
  data: {},
};

export default jmsLint;
