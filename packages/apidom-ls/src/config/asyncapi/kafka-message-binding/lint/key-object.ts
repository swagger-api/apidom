import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const keyObjectLint: LinterMeta = {
  code: ApilintCodes.SERVER_VARIABLES_OBJECT,
  source: 'apilint',
  message: 'key must be an object (Schema or AVRO Schema)',
  severity: 1,
  linterFunction: 'apilintType',
  linterParams: ['object'],
  marker: 'value',
  target: 'key',
  data: {},
};

export default keyObjectLint;
