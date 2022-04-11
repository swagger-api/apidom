import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const infoVersionLint: LinterMeta = {
  code: ApilintCodes.INFO_VERSION,
  source: 'apilint',
  message: 'version must be a string',
  severity: 1,
  linterFunction: 'apilintType',
  linterParams: ['string'],
  marker: 'value',
  target: 'version',
  data: {},
};

export default infoVersionLint;
