import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const componentsMessageTraitsLint: LinterMeta = {
  code: ApilintCodes.COMPONENTS_MESSAGETRAITS,
  source: 'apilint',
  message: '"messageTraits" members must be Security Scheme Object',
  severity: 1,
  linterFunction: 'apilintChildrenOfElementsOrClasess',
  linterParams: [['messageTrait']],
  marker: 'key',
  markerTarget: 'messageTraits',
  target: 'messageTraits',
  data: {},
};

export default componentsMessageTraitsLint;
