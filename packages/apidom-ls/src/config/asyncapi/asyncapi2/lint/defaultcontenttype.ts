import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const rootDefaultContentTypeLint: LinterMeta = {
  code: ApilintCodes.DEFAULTCONTENT_STRING,
  source: 'apilint',
  message: "defaultContentType' value must be a string",
  severity: 1,
  linterFunction: 'apilintType',
  linterParams: ['string'],
  marker: 'value',
  target: 'defaultContentType',
  data: {},
};

export default rootDefaultContentTypeLint;
