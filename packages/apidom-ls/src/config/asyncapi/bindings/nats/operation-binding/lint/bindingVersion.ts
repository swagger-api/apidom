import ApilintCodes from '../../../../../codes';
import { LinterMeta } from '../../../../../../apidom-language-types';

const natsOperationBindingBindingVersionLint: LinterMeta = {
  code: ApilintCodes.OPERATION_BINDING_NATS_BINDINGVERSION,
  source: 'apilint',
  message: "'bindingVersion' value must be a string",
  severity: 1,
  linterFunction: 'apilintType',
  linterParams: ['string'],
  marker: 'value',
  target: 'bindingVersion',
  data: {},
};

export default natsOperationBindingBindingVersionLint;
