import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const stompLint: LinterMeta = {
  code: ApilintCodes.SERVER_BINDING_STOMP,
  source: 'apilint',
  message: '"stomp" must be a STOMP Server Binding',
  severity: 1,
  linterFunction: 'apilintElementOrClass',
  linterParams: ['stompServerBinding'],
  marker: 'value',
  target: 'stomp',
  data: {},
};

export default stompLint;
