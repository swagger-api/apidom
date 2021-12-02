import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const serverVariablesObjectLint: LinterMeta = {
  code: ApilintCodes.SERVER_VARIABLES_OBJECT,
  source: 'apilint',
  message: 'variables must be an object',
  severity: 1,
  linterFunction: 'apilintType',
  linterParams: ['object'],
  marker: 'value',
  target: 'variables',
  data: {},
};

export default serverVariablesObjectLint;
