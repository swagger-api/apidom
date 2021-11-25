import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const schemaWriteOnlyLint: LinterMeta = {
  code: ApilintCodes.SCHEMA_WRITEONLY,
  source: 'apilint',
  message: 'writeOnly must be a boolean',
  severity: 1,
  linterFunction: 'apilintType',
  linterParams: ['boolean'],
  marker: 'value',
  target: 'writeOnly',
  data: {},
};

export default schemaWriteOnlyLint;
