import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const stompLint: LinterMeta = {
  code: ApilintCodes.MESSAGE_BINDING_STOMP,
  source: 'apilint',
  message: '"stomp" must be a STOMP Message Binding',
  severity: 1,
  linterFunction: 'apilintElementOrClass',
  linterParams: ['stompMessageBinding'],
  marker: 'value',
  target: 'stomp',
  data: {},
};

export default stompLint;
