import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const locationTypeLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI2_CORRELATION_ID_FIELD_LOCATION_TYPE,
  source: 'apilint',
  message: "'location' value must be a string",
  severity: 1,
  linterFunction: 'apilintType',
  linterParams: ['string'],
  marker: 'value',
  target: 'name',
  data: {},
};

export default locationTypeLint;
