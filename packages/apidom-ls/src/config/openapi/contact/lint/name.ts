import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const contactNameLint: LinterMeta = {
  code: ApilintCodes.CONTACT_NAME,
  source: 'apilint',
  message: "'name' must be a string",
  severity: 1,
  linterFunction: 'apilintType',
  linterParams: ['string'],
  marker: 'value',
  target: 'name',
  data: {},
};

export default contactNameLint;
