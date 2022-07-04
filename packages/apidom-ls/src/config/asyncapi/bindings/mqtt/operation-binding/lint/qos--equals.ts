import ApilintCodes from '../../../../../codes';
import { LinterMeta } from '../../../../../../apidom-language-types';

const qosTypeLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI2_MQTT_OPERATION_BINDING_FIELD_QOS_EQUALS,
  source: 'apilint',
  message: "'qos' must be one of allowed values",
  severity: 1,
  linterFunction: 'apilintValueOrArray',
  linterParams: [[0, 1, 2]],
  marker: 'value',
  target: 'qos',
  data: {},
};

export default qosTypeLint;
