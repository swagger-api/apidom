import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const parameterLocationLint: LinterMeta = {
  code: ApilintCodes.PARAMETER_LOCATION,
  source: 'apilint',
  message: "'location' must be a string",
  severity: 1,
  linterFunction: 'apilintType',
  linterParams: ['string'],
  marker: 'value',
  target: 'location',
  data: {},
};

export default parameterLocationLint;
