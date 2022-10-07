import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const examplesValuesTypeLint: LinterMeta = {
  code: ApilintCodes.OPENAPI_3_0_PARAMETER_FIELD_EXAMPLES_VALUES_TYPE,
  source: 'apilint',
  message: '"examples" members must be Example Object',
  severity: 1,
  linterFunction: 'apilintChildrenOfElementsOrClasses',
  linterParams: [['example']],
  marker: 'key',
  markerTarget: 'examples',
  target: 'examples',
  data: {},
};

export default examplesValuesTypeLint;
