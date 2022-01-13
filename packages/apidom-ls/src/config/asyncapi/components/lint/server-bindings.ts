import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const componentsServerBindingsLint: LinterMeta = {
  code: ApilintCodes.COMPONENTS_SERVERBINDINGS,
  source: 'apilint',
  message: '"serverBindings" members must be Server Bindings Object',
  severity: 1,
  linterFunction: 'apilintChildrenOfElementsOrClasess',
  linterParams: [['serverBindings']],
  marker: 'key',
  markerTarget: 'serverBindings',
  target: 'serverBindings',
  data: {},
};

export default componentsServerBindingsLint;
