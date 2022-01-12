import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const jmsLint: LinterMeta = {
  code: ApilintCodes.SERVER_BINDING_JMS,
  source: 'apilint',
  message: '"jms" must be a JMS Server Binding',
  severity: 1,
  linterFunction: 'apilintElementOrClass',
  linterParams: ['httpServerBinding'],
  marker: 'value',
  target: 'jms',
  data: {},
};

export default jmsLint;
