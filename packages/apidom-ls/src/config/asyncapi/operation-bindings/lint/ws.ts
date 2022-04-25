import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const wsLint: LinterMeta = {
  code: ApilintCodes.OPERATION_BINDING_WS,
  source: 'apilint',
  message: '"ws" must be a WebSockets Operation Binding',
  severity: 1,
  linterFunction: 'apilintElementOrClass',
  linterParams: ['wsOperationBinding'],
  marker: 'value',
  target: 'ws',
  data: {},
};

export default wsLint;
