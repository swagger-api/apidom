import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const correlationId$RefLint: LinterMeta = {
  code: ApilintCodes.CORRELATIONID_REF,
  source: 'apilint',
  message: "'$ref' value must be a valid URI-reference",
  severity: 1,
  linterFunction: 'apilintValidURI',
  marker: 'value',
  target: '$ref',
  data: {},
};

export default correlationId$RefLint;
