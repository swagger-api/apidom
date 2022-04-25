import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const stompLint: LinterMeta = {
  code: ApilintCodes.OPERATION_BINDING_STOMP,
  source: 'apilint',
  message: '"stomp" must be a STOMP Operation Binding',
  severity: 1,
  linterFunction: 'apilintElementOrClass',
  linterParams: ['stompOperationBinding'],
  marker: 'value',
  target: 'stomp',
  data: {},
};

export default stompLint;
