import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../../../../codes.ts';
import { LinterMeta } from '../../../../../../../apidom-language-types.ts';

const maximumPacketSizeTypeLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI2_MQTT_SERVER_BINDING_FIELD_MAXIMUM_PACKET_SIZE_TYPE,
  source: 'apilint',
  message: "'maximumPacketSize' must be an integer or a Schema Object",
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintElementOrClass',
  linterParams: [['schema', 'number']],
  marker: 'value',
  target: 'maximumPacketSize',
  data: {},
  conditions: [
    {
      targets: [{ path: 'bindingVersion' }],
      function: 'apilintValueOrArray',
      params: [['0.2.0']],
    },
  ],
};

export default maximumPacketSizeTypeLint;
