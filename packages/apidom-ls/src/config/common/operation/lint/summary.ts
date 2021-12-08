import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const operationSummaryLint: LinterMeta = {
  code: ApilintCodes.OPERATION_SUMMARY,
  source: 'apilint',
  message: "summary' value must be a string",
  severity: 1,
  linterFunction: 'apilintType',
  linterParams: ['string'],
  marker: 'value',
  target: 'summary',
  data: {},
};

export default operationSummaryLint;
