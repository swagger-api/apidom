import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const $refFormatURILint: LinterMeta = {
  code: ApilintCodes.OPENAPI3_REFERENCE_FIELD_$REF_FORMAT_URI,
  source: 'apilint',
  message: "'$ref' value must be a valid URI-reference",
  severity: 1,
  linterFunction: 'apilintValidURI',
  marker: 'value',
  target: '$ref',
  data: {},
};

export default $refFormatURILint;
