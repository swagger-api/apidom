import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const parametersValuesTypeLint: LinterMeta = {
  code: ApilintCodes.OPENAPI3_0_COMPONENTS_FIELD_PARAMETERS_VALUES_TYPE,
  source: 'apilint',
  message: '"parameters" members must be Parameter Object',
  severity: 1,
  linterFunction: 'apilintChildrenOfElementsOrClasses',
  linterParams: [['parameter']],
  marker: 'key',
  markerTarget: 'parameters',
  target: 'parameters',
  data: {},
};

export default parametersValuesTypeLint;
