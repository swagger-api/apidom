import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const securityKeysLint: LinterMeta = {
  code: ApilintCodes.SECURITYREQUIREMENT_KEYS,
  source: 'apilint',
  message: 'security members must be included in defined security schemes',
  severity: 1,
  linterFunction: 'apilintKeysIncluded',
  linterParams: ['root.components.securitySchemes'],
  marker: 'key',
  data: {},
};

export default securityKeysLint;
