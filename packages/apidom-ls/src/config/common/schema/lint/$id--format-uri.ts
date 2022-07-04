import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const $idFormatURILint: LinterMeta = {
  code: ApilintCodes.SCHEMA_ID,
  source: 'apilint',
  message: "'$id' value must be a valid URI-reference string",
  severity: 1,
  linterFunction: 'apilintValidURI',
  marker: 'value',
  target: '$id',
  data: {},
};

export default $idFormatURILint;
