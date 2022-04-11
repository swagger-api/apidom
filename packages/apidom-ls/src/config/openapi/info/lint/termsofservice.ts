import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const infoTermsOfServiceLint: LinterMeta = {
  code: ApilintCodes.INFO_TERMS,
  source: 'apilint',
  message: 'termsOfService must be a string',
  severity: 1,
  linterFunction: 'apilintType',
  linterParams: ['string'],
  marker: 'value',
  target: 'termsOfService',
  data: {},
};

export default infoTermsOfServiceLint;
