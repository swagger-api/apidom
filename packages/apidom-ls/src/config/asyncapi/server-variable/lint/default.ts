import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const serverVariableDefaultLint: LinterMeta = {
  code: ApilintCodes.SERVERVARIABLE_DEFAULT,
  source: 'apilint',
  message: "'default' must be a string",
  severity: 1,
  linterFunction: 'apilintType',
  linterParams: ['string'],
  marker: 'value',
  target: 'default',
  data: {},
};

export default serverVariableDefaultLint;
