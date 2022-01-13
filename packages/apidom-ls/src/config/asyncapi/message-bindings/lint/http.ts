import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const httpLint: LinterMeta = {
  code: ApilintCodes.MESSAGE_BINDING_HTTP,
  source: 'apilint',
  message: '"http" must be a HTTP Message Binding',
  severity: 1,
  linterFunction: 'apilintElementOrClass',
  linterParams: ['httpMessageBinding'],
  marker: 'value',
  target: 'http',
  data: {},
};

export default httpLint;
