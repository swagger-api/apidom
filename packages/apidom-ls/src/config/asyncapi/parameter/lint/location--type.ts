import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const locationTypeLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI2_PARAMETER_FIELD_LOCATION_TYPE,
  source: 'apilint',
  message: "'location' must be a string",
  severity: 1,
  linterFunction: 'apilintType',
  linterParams: ['string'],
  marker: 'value',
  target: 'location',
  data: {},
};

export default locationTypeLint;
