import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const solaceLint: LinterMeta = {
  code: ApilintCodes.SERVER_BINDING_SOLACE,
  source: 'apilint',
  message: '"solace" must be a Solace Server Binding',
  severity: 1,
  linterFunction: 'apilintElementOrClass',
  linterParams: ['solaceServerBinding'],
  marker: 'value',
  target: 'solace',
  data: {},
};

export default solaceLint;
