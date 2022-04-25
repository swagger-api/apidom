import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const jmsLint: LinterMeta = {
  code: ApilintCodes.OPERATION_BINDING_JMS,
  source: 'apilint',
  message: '"jms" must be a JMS Operation Binding',
  severity: 1,
  linterFunction: 'apilintElementOrClass',
  linterParams: ['httpOperationBinding'],
  marker: 'value',
  target: 'jms',
  data: {},
};

export default jmsLint;
