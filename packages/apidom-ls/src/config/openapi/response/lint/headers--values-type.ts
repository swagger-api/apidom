import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const headersValuesTypeLint: LinterMeta = {
  code: ApilintCodes.OPENAPI3_0_RESPONSE_FIELD_HEADERS_VALUES_TYPE,
  source: 'apilint',
  message: '"headers" members must be Header Object',
  severity: 1,
  linterFunction: 'apilintChildrenOfElementsOrClasses',
  linterParams: [['header']],
  marker: 'key',
  markerTarget: 'headers',
  target: 'headers',
  data: {},
};

export default headersValuesTypeLint;
