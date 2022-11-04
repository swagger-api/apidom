import ApilintCodes from '../../../../../../codes';
import { LinterMeta } from '../../../../../../../apidom-language-types';

const cleanSessionTypeLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI2_MQTT_SERVER_BINDING_FIELD_CLEAN_SESSION_TYPE,
  source: 'apilint',
  message: "'cleanSession' value must be a boolean",
  severity: 1,
  linterFunction: 'apilintType',
  linterParams: ['boolean'],
  marker: 'value',
  target: 'cleanSession',
  data: {},
  conditions: [
    {
      function: 'missingField',
      params: ['bindingVersion'],
    },
  ],
};

export default cleanSessionTypeLint;
