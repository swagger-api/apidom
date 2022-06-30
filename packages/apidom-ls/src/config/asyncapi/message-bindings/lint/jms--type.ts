import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const jmsTypeLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI2_MESSAGE_BINDINGS_FIELD_JMS_TYPE,
  source: 'apilint',
  message: '"jms" must be a JMS Message Binding',
  severity: 1,
  linterFunction: 'apilintElementOrClass',
  linterParams: ['httpMessageBinding'],
  marker: 'value',
  target: 'jms',
  data: {},
};

export default jmsTypeLint;
