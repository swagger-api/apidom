import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const solaceLint: LinterMeta = {
  code: ApilintCodes.MESSAGE_BINDING_JMS,
  source: 'apilint',
  message: '"solace" must be a Solace Message Binding',
  severity: 1,
  linterFunction: 'apilintElementOrClass',
  linterParams: ['solaceMessageBinding'],
  marker: 'value',
  target: 'solace',
  data: {},
};

export default solaceLint;
