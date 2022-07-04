import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const examplesTypeLint: LinterMeta = {
  code: ApilintCodes.SCHEMA_EXAMPLES,
  source: 'apilint',
  message: 'examples must be an array',
  severity: 1,
  linterFunction: 'apilintArray',
  marker: 'key',
  target: 'examples',
  data: {},
};

export default examplesTypeLint;
