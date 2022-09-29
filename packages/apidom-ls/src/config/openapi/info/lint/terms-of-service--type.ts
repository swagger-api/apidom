import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const termsOfServiceTypeLint: LinterMeta = {
  code: ApilintCodes.OPENAPI3_0_INFO_FIELD_TERMS_OF_SERVICE_TYPE,
  source: 'apilint',
  message: 'termsOfService must be a string',
  severity: 1,
  linterFunction: 'apilintType',
  linterParams: ['string'],
  marker: 'value',
  target: 'termsOfService',
  data: {},
  targetSpecs: [
    { namespace: 'openapi', version: '3.0.0' },
    { namespace: 'openapi', version: '3.0.1' },
    { namespace: 'openapi', version: '3.0.2' },
    { namespace: 'openapi', version: '3.0.3' },
    { namespace: 'openapi', version: '3.1.0' },
  ],
};

export default termsOfServiceTypeLint;
