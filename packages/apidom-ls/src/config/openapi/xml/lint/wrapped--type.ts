import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const wrappedTypeLint: LinterMeta = {
  code: ApilintCodes.OPENAPI3_0_XML_FIELD_WRAPPED_TYPE,
  source: 'apilint',
  message: 'wrapped must be a boolean',
  severity: 1,
  linterFunction: 'apilintType',
  linterParams: ['boolean'],
  marker: 'value',
  target: 'wrapped',
  data: {},
};

export default wrappedTypeLint;
