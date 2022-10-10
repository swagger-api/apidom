import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const inTypeLint: LinterMeta = {
  code: ApilintCodes.OPENAPI3_0_PARAMETER_FIELD_IN_TYPE,
  source: 'apilint',
  message: 'in must be a string',
  severity: 1,
  linterFunction: 'apilintType',
  linterParams: ['string'],
  marker: 'value',
  target: 'in',
  data: {},
};

export default inTypeLint;
