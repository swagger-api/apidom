import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const emailFormatEmailLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI2_CONTACT_FIELD_EMAIL_FORMAT_EMAIL,
  source: 'apilint',
  message: "'email' must be a valid email",
  severity: 1,
  linterFunction: 'apilintValueRegex',
  linterParams: ['.+@{1}.+'],
  marker: 'value',
  target: 'email',
  data: {},
};

export default emailFormatEmailLint;
