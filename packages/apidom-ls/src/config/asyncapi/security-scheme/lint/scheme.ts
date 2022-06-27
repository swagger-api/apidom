import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const securitySchemeSchemeLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI_SECURITYSCHEME_SCHEME,
  source: 'apilint',
  message: "'scheme' must be a string",
  severity: 1,
  linterFunction: 'apilintType',
  linterParams: ['string'],
  marker: 'value',
  target: 'scheme',
  data: {},
};

export default securitySchemeSchemeLint;
