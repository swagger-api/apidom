import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const operationTraitsValuesTypeLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI2_COMPONENTS_FIELD_OPERATION_TRAITS_VALUES_TYPE,
  source: 'apilint',
  message: '"operationTraits" members must be Security Scheme Object',
  severity: 1,
  linterFunction: 'apilintChildrenOfElementsOrClasses',
  linterParams: [['operationTrait']],
  marker: 'key',
  markerTarget: 'operationTraits',
  target: 'operationTraits',
  data: {},
};

export default operationTraitsValuesTypeLint;
