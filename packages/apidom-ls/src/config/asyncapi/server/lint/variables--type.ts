import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const variablesTypeLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI2_SERVER_FIELD_VARIABLES_TYPE,
  source: 'apilint',
  message: 'variables must be an object',
  severity: 1,
  linterFunction: 'apilintElementOrClass',
  linterParams: [['server-variables']],
  marker: 'value',
  target: 'variables',
  data: {},
};

export default variablesTypeLint;
