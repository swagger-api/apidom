import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const responsesTypeLint: LinterMeta = {
  code: ApilintCodes.OPENAPI3_0_OPERATION_FIELD_RESPONSES_TYPE,
  source: 'apilint',
  message: 'responses must be an object',
  severity: 1,
  linterFunction: 'apilintElementOrClass',
  linterParams: ['responses'],
  marker: 'value',
  target: 'responses',
  data: {},
};

export default responsesTypeLint;
