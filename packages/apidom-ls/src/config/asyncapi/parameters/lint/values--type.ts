import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const valuesTypeLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI2_PARAMETERS_VALUES_TYPE,
  source: 'apilint',
  message: 'Parameters Object values must be of Parameter Object shape',
  severity: 1,
  linterFunction: 'apilintChildrenOfElementsOrClasses',
  linterParams: [['parameter']],
  marker: 'key',
  data: {},
};

export default valuesTypeLint;
