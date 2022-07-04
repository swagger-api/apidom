import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const requiredTypeLint: LinterMeta = {
  code: ApilintCodes.SCHEMA_REQUIRED,
  source: 'apilint',
  message: 'required must be an array of strings',
  severity: 1,
  linterFunction: 'apilintArrayOfType',
  linterParams: ['string'],
  marker: 'key',
  target: 'required',
  data: {},
};

export default requiredTypeLint;
