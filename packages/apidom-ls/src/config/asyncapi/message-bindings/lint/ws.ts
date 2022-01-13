import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const wsLint: LinterMeta = {
  code: ApilintCodes.MESSAGE_BINDING_WS,
  source: 'apilint',
  message: '"ws" must be a WebSockets Message Binding',
  severity: 1,
  linterFunction: 'apilintElementOrClass',
  linterParams: ['wsMessageBinding'],
  marker: 'value',
  target: 'ws',
  data: {},
};

export default wsLint;
