import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const parameter$RefLint: LinterMeta = {
  code: ApilintCodes.PARAMETER_REF,
  source: 'apilint',
  message: "'$ref' value must be a valid URI-reference",
  severity: 1,
  linterFunction: 'apilintValidURI',
  marker: 'value',
  target: '$ref',
  data: {},
};

export default parameter$RefLint;
