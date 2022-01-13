import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const messageTitleLint: LinterMeta = {
  code: ApilintCodes.MESSAGE_TITLE,
  source: 'apilint',
  message: "title' value must be a string",
  severity: 1,
  linterFunction: 'apilintType',
  linterParams: ['string'],
  marker: 'value',
  target: 'title',
  data: {},
};

export default messageTitleLint;
