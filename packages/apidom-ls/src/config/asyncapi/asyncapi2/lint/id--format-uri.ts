import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const idFormatURILint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI2_ASYNC_API_FIELD_ID_TYPE,
  source: 'apilint',
  message: "'id' value must be a valid URI",
  severity: 1,
  linterFunction: 'apilintValidURI',
  marker: 'value',
  target: 'id',
  data: {},
};

export default idFormatURILint;
