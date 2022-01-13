import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const componentsOperationBindingsLint: LinterMeta = {
  code: ApilintCodes.COMPONENTS_OPERATIONBINDINGS,
  source: 'apilint',
  message: '"operationBindings" members must be Operation Bindings Object',
  severity: 1,
  linterFunction: 'apilintChildrenOfElementsOrClasess',
  linterParams: [['operationBindings']],
  marker: 'key',
  markerTarget: 'operationBindings',
  target: 'operationBindings',
  data: {},
};

export default componentsOperationBindingsLint;
