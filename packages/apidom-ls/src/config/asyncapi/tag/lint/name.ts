import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const tagNameLint: LinterMeta = {
  code: ApilintCodes.TAG_NAME,
  source: 'apilint',
  message: "'description' value must be a string",
  severity: 1,
  linterFunction: 'apilintType',
  linterParams: ['string'],
  marker: 'value',
  target: 'name',
  data: {},
};

export default tagNameLint;
