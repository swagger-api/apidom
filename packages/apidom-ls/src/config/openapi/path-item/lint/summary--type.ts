import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const summaryTypeLint: LinterMeta = {
  code: ApilintCodes.OPENAPI3_0_PATH_ITEM_FIELD_SUMMARY_TYPE,
  source: 'apilint',
  message: 'summary must be a string',
  severity: 1,
  linterFunction: 'apilintType',
  linterParams: ['string'],
  marker: 'value',
  target: 'summary',
  data: {},
};

export default summaryTypeLint;
