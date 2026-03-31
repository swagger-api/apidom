import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../../../../codes.ts';
import { LinterMeta } from '../../../../../../../apidom-language-types.ts';

const maximumPacketSizeMinimumLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI2_MQTT_SERVER_BINDING_FIELD_MAXIMUM_PACKET_SIZE_MINIMUM,
  source: 'apilint',
  message: "'maximumPacketSize' must be a positive integer (>=1)",
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintNumber',
  linterParams: [true, true, false],
  marker: 'value',
  target: 'maximumPacketSize',
  data: {},
  conditions: [
    {
      targets: [{ path: 'bindingVersion' }],
      function: 'apilintValueOrArray',
      params: [['0.2.0']],
    },
    {
      targets: [{ path: 'maximumPacketSize' }],
      function: 'apilintElementOrClass',
      params: [['number']],
    },
  ],
};

export default maximumPacketSizeMinimumLint;
