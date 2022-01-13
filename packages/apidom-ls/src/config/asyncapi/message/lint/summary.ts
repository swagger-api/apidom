import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const messageSummaryLint: LinterMeta = {
  code: ApilintCodes.MESSAGE_SUMMARY,
  source: 'apilint',
  message: "summary' value must be a string",
  severity: 1,
  linterFunction: 'apilintType',
  linterParams: ['string'],
  marker: 'value',
  target: 'summary',
  data: {},
};

export default messageSummaryLint;
