import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const licenseNameLint: LinterMeta = {
  code: ApilintCodes.LICENSE_NAME,
  source: 'apilint',
  message: "'name' must be a string",
  severity: 1,
  linterFunction: 'apilintType',
  linterParams: ['string'],
  marker: 'value',
  target: 'name',
  data: {},
};

export default licenseNameLint;
