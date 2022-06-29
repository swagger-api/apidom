import ApilintCodes from '../../../../../codes';
import { LinterMeta } from '../../../../../../apidom-language-types';

const solaceOperationBindingDestinationsLint: LinterMeta = {
  code: ApilintCodes.OPERATION_BINDING_SOLACE_DESTINATIONS,
  source: 'apilint',
  message: "'destinations' value must be a list",
  severity: 1,
  linterFunction: 'apilintType',
  linterParams: ['array'],
  marker: 'value',
  target: 'destinations',
  data: {},
};

export default solaceOperationBindingDestinationsLint;
