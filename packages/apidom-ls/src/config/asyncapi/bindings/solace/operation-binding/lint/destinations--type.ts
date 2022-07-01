import ApilintCodes from '../../../../../codes';
import { LinterMeta } from '../../../../../../apidom-language-types';

const destinationsTypeLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI2_SOLACE_OPERATION_BINDING_FIELD_DESTINATIONS_TYPE,
  source: 'apilint',
  message: "'destinations' value must be a list",
  severity: 1,
  linterFunction: 'apilintType',
  linterParams: ['array'],
  marker: 'value',
  target: 'destinations',
  data: {},
};

export default destinationsTypeLint;
