import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const variablesValuesTypeLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI2_SERVER_FIELD_VARIABLES_VALUES_TYPE,
  source: 'apilint',
  message: "variables' values must be of Server Variable Object shape",
  severity: 1,
  linterFunction: 'apilintChildrenOfElementsOrClasses',
  linterParams: [['serverVariable']],
  marker: 'key',
  markerTarget: 'variables',
  target: 'variables',
  data: {},
};

export default variablesValuesTypeLint;
