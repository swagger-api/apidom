import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const infoDescriptionLint: LinterMeta = {
  code: ApilintCodes.INFO_DESCRIPTION,
  source: 'apilint',
  message: 'description must be a string',
  severity: 1,
  linterFunction: 'apilintType',
  linterParams: ['string'],
  marker: 'value',
  target: 'description',
  data: {},
};

export default infoDescriptionLint;
