import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const serverVariableDescriptionLint: LinterMeta = {
  code: ApilintCodes.SERVERVARIABLE_DESCRIPTION,
  source: 'apilint',
  message: "'description' must be a string",
  severity: 1,
  linterFunction: 'apilintType',
  linterParams: ['string'],
  marker: 'value',
  target: 'description',
  data: {},
};

export default serverVariableDescriptionLint;
