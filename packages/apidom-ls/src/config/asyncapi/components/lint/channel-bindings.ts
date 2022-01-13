import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const componentsChannelBindingsLint: LinterMeta = {
  code: ApilintCodes.COMPONENTS_CHANNELBINDINGS,
  source: 'apilint',
  message: '"channelBindings" members must be Channel Bindings Object',
  severity: 1,
  linterFunction: 'apilintChildrenOfElementsOrClasess',
  linterParams: [['channelBindings']],
  marker: 'key',
  markerTarget: 'channelBindings',
  target: 'channelBindings',
  data: {},
};

export default componentsChannelBindingsLint;
