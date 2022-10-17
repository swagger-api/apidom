import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const inEqualsLint: LinterMeta = {
  code: ApilintCodes.OPENAPI3_SECURITY_SCHEME_FIELD_IN_EQUALS,
  source: 'apilint',
  message: "'in' must be one of allowed values",
  severity: 1,
  linterFunction: 'apilintValueOrArray',
  linterParams: [['query', 'header', 'cookie']],
  marker: 'value',
  target: 'in',
  data: {},
};

export default inEqualsLint;
