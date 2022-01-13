import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const componentsMessagesLint: LinterMeta = {
  code: ApilintCodes.COMPONENTS_MESSAGES,
  source: 'apilint',
  message: '"messages" members must be Message object',
  severity: 1,
  linterFunction: 'apilintChildrenOfElementsOrClasess',
  linterParams: [['message']],
  marker: 'key',
  markerTarget: 'messages',
  target: 'messages',
  data: {},
};

export default componentsMessagesLint;
