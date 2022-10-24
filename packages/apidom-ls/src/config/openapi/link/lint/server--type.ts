import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const serverTypeLint: LinterMeta = {
  code: ApilintCodes.OPENAPI3_0_LINK_FIELD_SERVER_TYPE,
  source: 'apilint',
  message: 'server must be an object',
  severity: 1,
  linterFunction: 'apilintElementOrClass',
  linterParams: ['server'],
  marker: 'value',
  target: 'server',
  data: {},
};

export default serverTypeLint;
