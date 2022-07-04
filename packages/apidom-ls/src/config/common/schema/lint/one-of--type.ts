import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const oneOfTypeLint: LinterMeta = {
  code: ApilintCodes.SCHEMA_ONEOF,
  source: 'apilint',
  message: 'oneOf must be a non-empty array of schemas',
  severity: 1,
  linterFunction: 'apilintArrayOfElementsOrClasses',
  linterParams: [['schema'], true],
  marker: 'key',
  target: 'oneOf',
  data: {},
};

export default oneOfTypeLint;
