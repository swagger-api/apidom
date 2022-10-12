import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const implicitTypeLint: LinterMeta = {
  code: ApilintCodes.OPENAPI3_0_OAUTH_FLOWS_FIELD_IMPLICIT_TYPE,
  source: 'apilint',
  message: "'implicit' must be an object",
  severity: 1,
  linterFunction: 'apilintElementOrClass',
  linterParams: ['oAuthFlow'],
  marker: 'value',
  target: 'implicit',
  data: {},
};

export default implicitTypeLint;
