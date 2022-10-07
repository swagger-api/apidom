import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const traceTypeLint: LinterMeta = {
  code: ApilintCodes.OPENAPI3_0_PATH_ITEM_FIELD_TRACE_TYPE,
  source: 'apilint',
  message: '"trace" must be in a shape of the Operation Object',
  severity: 1,
  linterFunction: 'apilintElementOrClass',
  linterParams: ['operation'],
  marker: 'value',
  target: 'trace',
  data: {},
};

export default traceTypeLint;
