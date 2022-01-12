import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const wsLint: LinterMeta = {
  code: ApilintCodes.SERVER_BINDING_WS,
  source: 'apilint',
  message: '"ws" must be a WebSockets Server Binding',
  severity: 1,
  linterFunction: 'apilintElementOrClass',
  linterParams: ['wsServerBinding'],
  marker: 'value',
  target: 'ws',
  data: {},
};

export default wsLint;
