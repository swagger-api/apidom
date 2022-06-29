import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const termsOfServiceURILint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI2_INFO_FIELD_TERMS_OF_SERVICE_URI,
  source: 'apilint',
  message: 'termsOfService MUST be in the format of a URL.',
  severity: 1,
  linterFunction: 'apilintValidURI',
  marker: 'value',
  target: 'termsOfService',
  data: {},
};

export default termsOfServiceURILint;
