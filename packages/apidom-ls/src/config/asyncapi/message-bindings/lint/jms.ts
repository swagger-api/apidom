import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const jmsLint: LinterMeta = {
  code: ApilintCodes.MESSAGE_BINDING_JMS,
  source: 'apilint',
  message: '"jms" must be a JMS Message Binding',
  severity: 1,
  linterFunction: 'apilintElementOrClass',
  linterParams: ['httpMessageBinding'],
  marker: 'value',
  target: 'jms',
  data: {},
};

export default jmsLint;
