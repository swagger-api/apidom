import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const correlationIDLocationLint: LinterMeta = {
  code: ApilintCodes.CORRELATIONID_LOCATION,
  source: 'apilint',
  message: "'location' value must be a string",
  severity: 1,
  linterFunction: 'apilintType',
  linterParams: ['string'],
  marker: 'value',
  target: 'name',
  data: {},
};

export default correlationIDLocationLint;
