import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const traitsTypeLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI2_OPERATION_FIELD_TRAITS_TYPE,
  source: 'apilint',
  message: 'traits must be an array of Operation Trait Objects',
  severity: 1,
  linterFunction: 'apilintElementOrClass',
  linterParams: [['operation-traits']],
  marker: 'key',
  target: 'traits',
  data: {},
};

export default traitsTypeLint;
