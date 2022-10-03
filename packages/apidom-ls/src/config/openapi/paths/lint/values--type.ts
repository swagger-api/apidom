import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const valuesTypeLint: LinterMeta = {
  code: ApilintCodes.OPENAPI_3_0_PATHS_VALUES_PATTERN,
  source: 'apilint',
  message: 'Paths Object values must be of Path Item Object shape',
  severity: 1,
  linterFunction: 'apilintChildrenOfElementsOrClasses',
  linterParams: [['pathItem']],
  marker: 'key',
  data: {},
};

export default valuesTypeLint;
