import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const responsesValuesTypeLint: LinterMeta = {
  code: ApilintCodes.OPENAPI3_0_COMPONENTS_FIELD_RESPONSES_VALUES_TYPE,
  source: 'apilint',
  message: '"responses" members must be Response Object',
  severity: 1,
  linterFunction: 'apilintChildrenOfElementsOrClasses',
  linterParams: [['response']],
  marker: 'key',
  markerTarget: 'responses',
  target: 'responses',
  data: {},
};

export default responsesValuesTypeLint;
