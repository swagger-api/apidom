import ApilintCodes from '../../../../../codes';
import { LinterMeta } from '../../../../../../apidom-language-types';

const solaceOperationBindingBindingVersionLint: LinterMeta = {
  code: ApilintCodes.OPERATION_BINDING_SOLACE_BINDINGVERSION,
  source: 'apilint',
  message: "'bindingVersion' value must be a string",
  severity: 1,
  linterFunction: 'apilintType',
  linterParams: ['string'],
  marker: 'value',
  target: 'bindingVersion',
  data: {},
};

export default solaceOperationBindingBindingVersionLint;
