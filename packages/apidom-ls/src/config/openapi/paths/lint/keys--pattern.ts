import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const keysPatternLint: LinterMeta = {
  code: ApilintCodes.OPENAPI3_0_PATHS_KEYS_PATTERN,
  source: 'apilint',
  message: 'Paths Object keys must match the regular expression: `^/`',
  severity: 1,
  linterFunction: 'apilintKeysRegex',
  linterParams: ['^/'],
  marker: 'key',
  data: {},
};

export default keysPatternLint;
