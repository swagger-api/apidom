import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const ibmmqLint: LinterMeta = {
  code: ApilintCodes.MESSAGE_BINDING_IBMMQ,
  source: 'apilint',
  message: '"ibmmq" must be a IBM MQ Message Binding',
  severity: 1,
  linterFunction: 'apilintElementOrClass',
  linterParams: ['ibmmqMessageBinding'],
  marker: 'value',
  target: 'ibmmq',
  data: {},
};

export default ibmmqLint;
