import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const messageTrait$RefLint: LinterMeta = {
  code: ApilintCodes.MESSAGE_TRAIT_REF,
  source: 'apilint',
  message: "'$ref' value must be a valid URI-reference",
  severity: 1,
  linterFunction: 'apilintValidURI',
  marker: 'value',
  target: '$ref',
  data: {},
};

export default messageTrait$RefLint;
