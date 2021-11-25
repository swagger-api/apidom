import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const rootIdLint: LinterMeta = {
  code: ApilintCodes.ROOT_ID,
  source: 'apilint',
  message: "'id' value must be a valid URI",
  severity: 1,
  linterFunction: 'apilintValidURI',
  marker: 'value',
  target: 'id',
  data: {},
};

export default rootIdLint;
