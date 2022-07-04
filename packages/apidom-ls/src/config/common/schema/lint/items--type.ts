import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const itemsTypeLint: LinterMeta = {
  code: ApilintCodes.SCHEMA_ITEMS,
  source: 'apilint',
  message: 'items must be a schema or array of schemas',
  severity: 1,
  linterFunction: 'apilintElementOrClass',
  linterParams: [['schema', 'array']],
  marker: 'value',
  target: 'items',
  data: {},
};

export default itemsTypeLint;
