import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const operationTraitsLint: LinterMeta = {
  code: ApilintCodes.OPERATION_TRAITS,
  source: 'apilint',
  message: 'traits must be an array of Operation Trait',
  severity: 1,
  linterFunction: 'apilintArrayOfType',
  linterParams: ['object'],
  marker: 'key',
  target: 'traits',
  data: {},
};

export default operationTraitsLint;
