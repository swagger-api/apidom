import ApilintCodes from '../../../../../codes';
import { LinterMeta } from '../../../../../../apidom-language-types';

const httpOperationBindingBindingVersionLint: LinterMeta = {
  code: ApilintCodes.OPERATION_BINDING_HTTP_BINDINGVERSION,
  source: 'apilint',
  message: "'bindingVersion' value must be a string",
  severity: 1,
  linterFunction: 'apilintType',
  linterParams: ['string'],
  marker: 'value',
  target: 'bindingVersion',
  data: {},
};

export default httpOperationBindingBindingVersionLint;
