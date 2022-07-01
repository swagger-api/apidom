import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const summaryTypeLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI2_MESSAGE_FIELD_SUMMARY_TYPE,
  source: 'apilint',
  message: "'summary' value must be a string",
  severity: 1,
  linterFunction: 'apilintType',
  linterParams: ['string'],
  marker: 'value',
  target: 'summary',
  data: {},
};

export default summaryTypeLint;
