import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const licenseUrlLint: LinterMeta = {
  code: ApilintCodes.LICENSE_URL,
  source: 'apilint',
  message: "'url' value must be a valid URL",
  severity: 1,
  linterFunction: 'apilintValidURI',
  marker: 'value',
  target: 'url',
  data: {},
};

export default licenseUrlLint;
