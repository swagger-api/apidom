import ApilintCodes from '../../../../../codes';
import { LinterMeta } from '../../../../../../apidom-language-types';

const httpOperationBindingMethodLint: LinterMeta = {
  code: ApilintCodes.OPERATION_BINDING_HTTP_METHOD,
  source: 'apilint',
  message: "'method' value must be a string",
  severity: 1,
  linterFunction: 'apilintType',
  linterParams: ['string'],
  marker: 'value',
  target: 'method',
  data: {},
};

export default httpOperationBindingMethodLint;
