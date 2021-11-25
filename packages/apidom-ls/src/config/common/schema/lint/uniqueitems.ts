import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const schemaUniqueItemsLint: LinterMeta = {
  code: ApilintCodes.SCHEMA_UNIQUEITEMS,
  source: 'apilint',
  message: 'uniqueItems must be a boolean',
  severity: 1,
  linterFunction: 'apilintType',
  linterParams: ['boolean'],
  marker: 'value',
  target: 'uniqueItems',
  data: {},
};

export default schemaUniqueItemsLint;
