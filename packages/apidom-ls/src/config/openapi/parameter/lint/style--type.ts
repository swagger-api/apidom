import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const styleTypeLint: LinterMeta = {
  code: ApilintCodes.OPENAPI3_0_PARAMETER_FIELD_STYLE_TYPE,
  source: 'apilint',
  message: 'style must be a string',
  severity: 1,
  linterFunction: 'apilintType',
  linterParams: ['string'],
  marker: 'value',
  target: 'style',
  data: {},
};

export default styleTypeLint;
