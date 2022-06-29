import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const componentsMessageBindingsLint: LinterMeta = {
  code: ApilintCodes.COMPONENTS_MESSAGEBINDINGS,
  source: 'apilint',
  message: '"messageBindings" members must be Message Bindings Object',
  severity: 1,
  linterFunction: 'apilintChildrenOfElementsOrClasses',
  linterParams: [['messageBindings']],
  marker: 'key',
  markerTarget: 'messageBindings',
  target: 'messageBindings',
  data: {},
};

export default componentsMessageBindingsLint;
