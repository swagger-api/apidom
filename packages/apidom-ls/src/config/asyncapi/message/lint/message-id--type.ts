import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const messageIdTypeLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI2_MESSAGE_FIELD_MESSAGE_ID_TYPE,
  source: 'apilint',
  message: "'messageId' value must be a string",
  severity: 1,
  linterFunction: 'apilintType',
  linterParams: ['string'],
  marker: 'value',
  target: 'messageId',
  data: {},
};

export default messageIdTypeLint;
