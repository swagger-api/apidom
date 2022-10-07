import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const deprecatedTypeLint: LinterMeta = {
  code: ApilintCodes.OPENAPI3_0_OPERATION_FIELD_DEPRECATED_TYPE,
  source: 'apilint',
  message: 'deprecated must be a string',
  severity: 1,
  linterFunction: 'apilintType',
  linterParams: ['boolean'],
  marker: 'value',
  target: 'deprecated',
  data: {},
};

export default deprecatedTypeLint;
