import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const parametersTypeLint: LinterMeta = {
  code: ApilintCodes.OPENAPI3_0_OPERATION_FIELD_PARAMETERS_TYPE,
  source: 'apilint',
  message: 'parameters must be an array',
  severity: 1,
  linterFunction: 'apilintElementOrClass',
  linterParams: ['operation-parameters'],
  marker: 'value',
  target: 'parameters',
  data: {},
};

export default parametersTypeLint;
