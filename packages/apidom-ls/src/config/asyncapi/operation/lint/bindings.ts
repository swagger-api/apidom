import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const operationBindingsLint: LinterMeta = {
  code: ApilintCodes.OPERATION_BINDINGS,
  source: 'apilint',
  message: 'bindings members must be Operation Binding objects',
  severity: 1,
  linterFunction: 'apilintElementOrClass',
  linterParams: ['operationBindings'],
  marker: 'key',
  markerTarget: 'bindings',
  target: 'bindings',
  data: {},
};

export default operationBindingsLint;
