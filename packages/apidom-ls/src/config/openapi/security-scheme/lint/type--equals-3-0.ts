import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

// eslint-disable-next-line @typescript-eslint/naming-convention
const typeEquals3_0Lint: LinterMeta = {
  code: ApilintCodes.OPENAPI3_0_SECURITY_SCHEME_FIELD_TYPE_EQUALS,
  source: 'apilint',
  message: 'type must be one of allowed values',
  severity: 1,
  linterFunction: 'apilintValueOrArray',
  linterParams: [['apiKey', 'http', 'oauth2', 'openIdConnect']],
  marker: 'value',
  target: 'type',
};

export default typeEquals3_0Lint;
