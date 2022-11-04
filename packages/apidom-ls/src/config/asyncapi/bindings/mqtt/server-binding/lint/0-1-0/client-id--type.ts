import ApilintCodes from '../../../../../../codes';
import { LinterMeta } from '../../../../../../../apidom-language-types';

const clientIdTypeLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI2_MQTT_SERVER_BINDING_FIELD_CLIENT_ID_TYPE,
  source: 'apilint',
  message: "'clientId' value must be a string",
  severity: 1,
  linterFunction: 'apilintType',
  linterParams: ['string'],
  marker: 'value',
  target: 'clientId',
  data: {},
  conditions: [
    {
      targets: [{ path: 'bindingVersion' }],
      function: 'apilintValueOrArray',
      params: [['0.1.0']],
    },
  ],
};

export default clientIdTypeLint;
