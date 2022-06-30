import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const $refValidLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI2_SERVER_BINDINGS_FIELD_$REF_VALID,
  source: 'apilint',
  message: "'$ref' value must be a valid URI-reference",
  severity: 1,
  linterFunction: 'apilintValidURI',
  marker: 'value',
  target: '$ref',
  data: {},
};

export default $refValidLint;
