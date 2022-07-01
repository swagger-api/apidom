import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const operationBindingsValuesLintLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI2_COMPONENTS_FIELD_OPERATION_BINDINGS_VALUES_TYPE,
  source: 'apilint',
  message: '"operationBindings" members must be Operation Bindings Object',
  severity: 1,
  linterFunction: 'apilintChildrenOfElementsOrClasses',
  linterParams: [['operationBindings']],
  marker: 'key',
  markerTarget: 'operationBindings',
  target: 'operationBindings',
  data: {},
};

export default operationBindingsValuesLintLint;
