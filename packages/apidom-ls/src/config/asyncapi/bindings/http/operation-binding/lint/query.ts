import ApilintCodes from '../../../../../codes';
import { LinterMeta } from '../../../../../../apidom-language-types';

const httpOperationBindingQueryLint: LinterMeta = {
  code: ApilintCodes.OPERATION_BINDING_HTTP_QUERY,
  source: 'apilint',
  message: 'query must be an object',
  severity: 1,
  linterFunction: 'apilintElementOrClass',
  linterParams: ['schema'],
  marker: 'value',
  target: 'query',
  data: {},
};

export default httpOperationBindingQueryLint;
