import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const messageIdUniqueLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI2_MESSAGE_TRAIT_FIELD_MESSAGE_ID_UNIQUE,
  source: 'apilint',
  message: "messageID' must be unique among all messages",
  severity: 1,
  linterFunction: 'apilintPropertyUniqueValue',
  linterParams: [['message', 'messageTrait'], 'messageId'],
  marker: 'key',
  markerTarget: 'messageId',
  target: 'messageId',
  data: {},
};

export default messageIdUniqueLint;
