import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const solaceLint: LinterMeta = {
  code: ApilintCodes.OPERATION_BINDING_SOLACE,
  source: 'apilint',
  message: '"solace" must be a Solace Operation Binding',
  severity: 1,
  linterFunction: 'apilintElementOrClass',
  linterParams: ['solaceOperationBinding'],
  marker: 'value',
  target: 'solace',
  data: {},
};

export default solaceLint;
