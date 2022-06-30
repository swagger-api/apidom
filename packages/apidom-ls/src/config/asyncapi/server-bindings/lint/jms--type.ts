import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const jmsTypeLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI2_SERVER_BINDINGS_FIELD_JMS_TYPE,
  source: 'apilint',
  message: '"jms" must be a JMS Server Binding',
  severity: 1,
  linterFunction: 'apilintElementOrClass',
  linterParams: ['httpServerBinding'],
  marker: 'value',
  target: 'jms',
  data: {},
};

export default jmsTypeLint;
