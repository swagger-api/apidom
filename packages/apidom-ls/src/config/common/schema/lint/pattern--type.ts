import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const patternTypeLint: LinterMeta = {
  code: ApilintCodes.SCHEMA_PATTERN,
  source: 'apilint',
  message: "pattern' value must be a string",
  severity: 1,
  linterFunction: 'apilintType',
  linterParams: ['string'],
  marker: 'value',
  target: 'pattern',
  data: {},
};

export default patternTypeLint;
