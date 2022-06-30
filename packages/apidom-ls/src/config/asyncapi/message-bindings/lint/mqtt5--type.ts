import ApilintCodes from '../../../codes';
import { LinterMeta } from '../../../../apidom-language-types';

const mqtt5TypeLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI2_MESSAGE_BINDINGS_FIELD_MQTT5_TYPE,
  source: 'apilint',
  message: '"mqtt5" must be a MQTT 5 Message Binding',
  severity: 1,
  linterFunction: 'apilintElementOrClass',
  linterParams: ['mqtt5MessageBinding'],
  marker: 'value',
  target: 'mqtt5',
  data: {},
};

export default mqtt5TypeLint;
