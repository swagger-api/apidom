import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const valuesTypeLint: LinterMeta = {
  code: ApilintCodes.OPENAPI3_0_RESPONSES_VALUES_TYPE,
  source: 'apilint',
  message: 'Responses Object values must be of Response Object shape',
  severity: 1,
  linterFunction: 'apilintChildrenOfElementsOrClasses',
  linterParams: [['response']],
  marker: 'key',
  data: {},
};

export default valuesTypeLint;
