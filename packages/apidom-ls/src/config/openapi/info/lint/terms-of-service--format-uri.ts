import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const termsOfServiceFormatURILint: LinterMeta = {
  code: ApilintCodes.OPENAPI3_1_INFO_FIELD_TERMS_OF_SERVICE_FORMAT_URI,
  source: 'apilint',
  message: 'termsOfService MUST be in the format of a URL.',
  severity: 1,
  linterFunction: 'apilintValidURI',
  marker: 'value',
  target: 'termsOfService',
  data: {},
  targetSpecs: [{ namespace: 'openapi', version: '3.1.0' }],
};

export default termsOfServiceFormatURILint;
