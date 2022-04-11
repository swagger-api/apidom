import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const infoTitleLint: LinterMeta = {
  code: ApilintCodes.INFO_TITLE,
  source: 'apilint',
  message: 'title must be a string',
  severity: 1,
  linterFunction: 'apilintType',
  linterParams: ['string'],
  marker: 'value',
  target: 'title',
  data: {},
};

export default infoTitleLint;
