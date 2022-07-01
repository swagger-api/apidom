import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const componentsMessageTraitsLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI2_COMPONENTS_FIELD_MESSAGE_TRAITS_VALUES_TYPE,
  source: 'apilint',
  message: '"messageTraits" members must be Security Scheme Object',
  severity: 1,
  linterFunction: 'apilintChildrenOfElementsOrClasses',
  linterParams: [['messageTrait']],
  marker: 'key',
  markerTarget: 'messageTraits',
  target: 'messageTraits',
  data: {},
};

export default componentsMessageTraitsLint;
