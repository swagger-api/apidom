import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const schemaEnumLint: LinterMeta = {
  code: ApilintCodes.SCHEMA_ENUM,
  source: 'apilint',
  message: "enum' value must be an array with unique values",
  severity: 1,
  linterFunction: 'apilintUniqueArray',
  marker: 'value',
  target: 'enum',
  data: {},
};

export default schemaEnumLint;
