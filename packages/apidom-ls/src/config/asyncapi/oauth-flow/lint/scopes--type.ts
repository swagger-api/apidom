import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const scopesTypeLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI2_OAUTH_FLOW_FIELD_SCOPES_TYPE,
  source: 'apilint',
  message: "'scopes' must be an object",
  severity: 1,
  linterFunction: 'apilintElementOrClass',
  linterParams: ['oauth-flow-scopes'],
  marker: 'value',
  target: 'scopes',
  data: {},
};

export default scopesTypeLint;
