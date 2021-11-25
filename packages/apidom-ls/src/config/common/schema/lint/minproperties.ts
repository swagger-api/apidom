import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const schemaMinPropertiesLint: LinterMeta = {
  code: ApilintCodes.SCHEMA_MINPROPERTIES,
  source: 'apilint',
  message: 'minProperties must be a non-negative integer',
  severity: 1,
  linterFunction: 'apilintNumber',
  linterParams: [true, true, true],
  marker: 'value',
  target: 'minProperties',
  data: {},
};

export default schemaMinPropertiesLint;
