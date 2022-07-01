import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const keysPatternLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI2_COMPONENTS_KEYS_PATTERN,
  source: 'apilint',
  message: 'components keys must match the regular expression: `^[a-zA-Z0-9\\.\\-_]+$`',
  severity: 1,
  linterFunction: 'apilintMembersKeysRegex',
  linterParams: ['^[a-zA-Z0-9\\.\\-_]+$'],
  marker: 'key',
  data: {},
};

export default keysPatternLint;
