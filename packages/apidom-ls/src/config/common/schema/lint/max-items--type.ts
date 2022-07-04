import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const maxItemsTypeLint: LinterMeta = {
  code: ApilintCodes.SCHEMA_MAXITEMS,
  source: 'apilint',
  message: 'maxItems must be a non-negative integer',
  severity: 1,
  linterFunction: 'apilintNumber',
  linterParams: [true, true, true],
  marker: 'value',
  target: 'maxItems',
  data: {},
};

export default maxItemsTypeLint;
