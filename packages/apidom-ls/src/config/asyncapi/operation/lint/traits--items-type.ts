import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const traitsItemsTypeLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI2_OPERATION_FIELD_TRAITS_ITEMS_TYPE,
  source: 'apilint',
  message: 'traits must be an array of Operation Trait Objects',
  severity: 1,
  linterFunction: 'apilintArrayOfElementsOrClasses',
  linterParams: [['operationTrait']],
  marker: 'key',
  target: 'traits',
  data: {},
};

export default traitsItemsTypeLint;
