import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const licenseObjectLint: LinterMeta = {
  code: ApilintCodes.INFO_LICENSE,
  source: 'apilint',
  message: 'license must be an object',
  severity: 1,
  linterFunction: 'apilintElementOrClass',
  linterParams: ['license'],
  marker: 'value',
  target: 'license',
  data: {},
};

export default licenseObjectLint;
