import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const stompTypeLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI2_MESSAGE_BINDINGS_FIELD_STOMP_TYPE,
  source: 'apilint',
  message: '"stomp" must be a STOMP Message Binding',
  severity: 1,
  linterFunction: 'apilintElementOrClass',
  linterParams: ['stompMessageBinding'],
  marker: 'value',
  target: 'stomp',
  data: {},
};

export default stompTypeLint;
