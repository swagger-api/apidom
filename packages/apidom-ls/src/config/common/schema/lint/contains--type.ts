import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const containsTypeLint: LinterMeta = {
  code: ApilintCodes.SCHEMA_CONTAINS,
  source: 'apilint',
  message: 'contains must be a schema',
  severity: 1,
  linterFunction: 'apilintElementOrClass',
  linterParams: ['schema'],
  marker: 'value',
  target: 'contains',
  data: {},
};

export default containsTypeLint;
