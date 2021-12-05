import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const serverVariableEnumLint: LinterMeta = {
  code: ApilintCodes.SERVERVARIABLE_ENUM,
  source: 'apilint',
  message: "enum' value must be an array of strings",
  severity: 1,
  linterFunction: 'apilintArrayOfType',
  linterParams: ['string'],
  marker: 'value',
  target: 'enum',
  data: {},
};

export default serverVariableEnumLint;
