import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const keysPatternLint: LinterMeta = {
  code: ApilintCodes.OPENAPI_3_0_PATHS_KEYS_PATTERN,
  source: 'apilint',
  message: 'Paths Object keys must match the regular expression: `^/.*$`',
  severity: 1,
  linterFunction: 'apilintMembersKeysRegex',
  linterParams: ['^\\/.*$'],
  marker: 'key',
  data: {},
};

export default keysPatternLint;
