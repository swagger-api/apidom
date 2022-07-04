import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const formatTypeLint: LinterMeta = {
  code: ApilintCodes.SCHEMA_FORMAT,
  source: 'apilint',
  message: "format' value must be a string",
  severity: 1,
  linterFunction: 'apilintType',
  linterParams: ['string'],
  marker: 'value',
  target: 'format',
  data: {},
};

export default formatTypeLint;
