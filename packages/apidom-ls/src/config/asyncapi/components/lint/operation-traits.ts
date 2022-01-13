import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const componentsOperationTraitsLint: LinterMeta = {
  code: ApilintCodes.COMPONENTS_OPERATIONTRAITS,
  source: 'apilint',
  message: '"operationTraits" members must be Security Scheme Object',
  severity: 1,
  linterFunction: 'apilintChildrenOfElementsOrClasess',
  linterParams: [['operationTrait']],
  marker: 'key',
  markerTarget: 'operationTraits',
  target: 'operationTraits',
  data: {},
};

export default componentsOperationTraitsLint;
