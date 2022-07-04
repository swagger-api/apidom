import ApilintCodes from '../../../../../codes';
import { LinterMeta } from '../../../../../../apidom-language-types';

const exchangeTypeLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI2_AMQP_CHANNEL_BINDING_FIELD_QUEUE_TYPE,
  source: 'apilint',
  message: "'queue' value must be an object",
  severity: 1,
  linterFunction: 'apilintType',
  linterParams: ['object'],
  marker: 'value',
  target: 'queue',
  data: {},
};

export default exchangeTypeLint;
