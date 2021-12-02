import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const contactEmailLint: LinterMeta = {
  code: ApilintCodes.CONTACT_EMAIL,
  source: 'apilint',
  message: "'email' must be a valid email",
  severity: 1,
  linterFunction: 'apilintType',
  linterParams: ['string'],
  marker: 'value',
  target: 'email',
  data: {},
};

export default contactEmailLint;
