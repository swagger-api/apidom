import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const ibmmqLint: LinterMeta = {
  code: ApilintCodes.SERVER_BINDING_IBMMQ,
  source: 'apilint',
  message: '"ibmmq" must be a IBM MQ Server Binding',
  severity: 1,
  linterFunction: 'apilintElementOrClass',
  linterParams: ['ibmmqServerBinding'],
  marker: 'value',
  target: 'ibmmq',
  data: {},
};

export default ibmmqLint;
