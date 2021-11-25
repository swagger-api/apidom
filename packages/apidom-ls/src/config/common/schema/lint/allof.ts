import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const schemaAllOfLint: LinterMeta = {
  code: ApilintCodes.SCHEMA_ALLOF,
  source: 'apilint',
  message: 'allOf must be a non-empty array of schemas',
  severity: 1,
  linterFunction: 'apilintArrayOfElementsOrClasess',
  linterParams: [['schema'], true],
  marker: 'key',
  target: 'allOf',
  data: {},
};

export default schemaAllOfLint;
