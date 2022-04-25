import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const httpLint: LinterMeta = {
  code: ApilintCodes.OPERATION_BINDING_HTTP,
  source: 'apilint',
  message: '"http" must be a HTTP Operation Binding',
  severity: 1,
  linterFunction: 'apilintElementOrClass',
  linterParams: ['httpOperationBinding'],
  marker: 'value',
  target: 'http',
  data: {},
};

export default httpLint;
