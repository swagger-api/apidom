import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const infoVersionNumberLint: LinterMeta = {
  code: ApilintCodes.INFO_VERSION_NUMBER,
  source: 'apilint',
  message: 'version must be a string',
  severity: 1,
  linterFunction: 'apilintType',
  linterParams: ['string'],
  marker: 'value',
  target: 'version',
  data: {},
};

export default infoVersionNumberLint;
