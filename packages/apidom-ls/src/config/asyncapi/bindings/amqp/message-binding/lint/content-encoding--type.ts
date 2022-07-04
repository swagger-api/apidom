import ApilintCodes from '../../../../../codes';
import { LinterMeta } from '../../../../../../apidom-language-types';

const contentEncodingTypeLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI2_AMQP_MESSAGE_BINDING_FIELD_CONTENT_ENCODING_TYPE,
  source: 'apilint',
  message: "'contentEncoding' value must be a string",
  severity: 1,
  linterFunction: 'apilintType',
  linterParams: ['string'],
  marker: 'value',
  target: 'contentEncoding',
  data: {},
};

export default contentEncodingTypeLint;
