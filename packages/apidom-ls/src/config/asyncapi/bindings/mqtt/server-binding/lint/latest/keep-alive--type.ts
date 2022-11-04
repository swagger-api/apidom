import ApilintCodes from '../../../../../../codes';
import { LinterMeta } from '../../../../../../../apidom-language-types';

const keepAliveTypeLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI2_MQTT_SERVER_BINDING_FIELD_KEEP_ALIVE_TYPE,
  source: 'apilint',
  message: "'keepAlive' must be an integer",
  severity: 1,
  linterFunction: 'apilintNumber',
  linterParams: [true],
  marker: 'value',
  target: 'keepAlive',
  data: {},
  conditions: [
    {
      function: 'missingField',
      params: ['bindingVersion'],
    },
  ],
};

export default keepAliveTypeLint;
