import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const messagesValuesTypeLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI2_COMPONENTS_FIELD_MESSAGES_VALUES_TYPE,
  source: 'apilint',
  message: '"messages" members must be Message object',
  severity: 1,
  linterFunction: 'apilintChildrenOfElementsOrClasses',
  linterParams: [['message']],
  marker: 'key',
  markerTarget: 'messages',
  target: 'messages',
  data: {},
};

export default messagesValuesTypeLint;
