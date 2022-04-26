import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const infoSummaryLint: LinterMeta = {
  code: ApilintCodes.INFO_SUMMARY,
  source: 'apilint',
  message: 'summary must be a string',
  severity: 1,
  linterFunction: 'apilintType',
  linterParams: ['string'],
  marker: 'value',
  target: 'summary',
  data: {},
};

export default infoSummaryLint;
