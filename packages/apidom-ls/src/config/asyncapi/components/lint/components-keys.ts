import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const componentsKeysLint: LinterMeta = {
  code: ApilintCodes.COMPONENTS_KEYS,
  source: 'apilint',
  message: 'components members keys must match the regular expression: `^[a-zA-Z0-9\\.\\-_]+$`',
  severity: 1,
  linterFunction: 'apilintMembersKeysRegex',
  linterParams: ['^[a-zA-Z0-9\\.\\-_]+$'],
  marker: 'key',
  data: {},
};

export default componentsKeysLint;
