import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const httpTypeLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI2_OPERATION_BINDINGS_FIELD_HTTP_TYPE,
  source: 'apilint',
  message: '"http" must be a HTTP Operation Binding',
  severity: 1,
  linterFunction: 'apilintElementOrClass',
  linterParams: ['httpOperationBinding'],
  marker: 'value',
  target: 'http',
  data: {},
};

export default httpTypeLint;
