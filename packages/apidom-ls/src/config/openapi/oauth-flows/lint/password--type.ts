import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const passwordTypeLint: LinterMeta = {
  code: ApilintCodes.OPENAPI3_0_OAUTH_FLOWS_FIELD_PASSWORD_TYPE,
  source: 'apilint',
  message: "'password' must be an object",
  severity: 1,
  linterFunction: 'apilintElementOrClass',
  linterParams: ['oAuthFlow'],
  marker: 'value',
  target: 'password',
  data: {},
};

export default passwordTypeLint;
