import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const httpLint: LinterMeta = {
  code: ApilintCodes.SERVER_BINDING_HTTP,
  source: 'apilint',
  message: '"http" must be a HTTP Server Binding',
  severity: 1,
  linterFunction: 'apilintElementOrClass',
  linterParams: ['httpServerBinding'],
  marker: 'value',
  target: 'http',
  data: {},
};

export default httpLint;
