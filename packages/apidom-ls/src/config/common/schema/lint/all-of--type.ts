import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const allOfTypeLint: LinterMeta = {
  code: ApilintCodes.SCHEMA_ALLOF,
  source: 'apilint',
  message: 'allOf must be a non-empty array of schemas',
  severity: 1,
  linterFunction: 'apilintArrayOfElementsOrClasses',
  linterParams: [['schema'], true],
  marker: 'key',
  target: 'allOf',
  data: {},
};

export default allOfTypeLint;
