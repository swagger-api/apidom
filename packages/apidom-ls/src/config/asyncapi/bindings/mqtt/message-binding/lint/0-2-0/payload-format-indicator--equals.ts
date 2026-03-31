import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../../../../codes.ts';
import { LinterMeta } from '../../../../../../../apidom-language-types.ts';

const payloadFormatIndicatorEqualsLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI2_MQTT_MESSAGE_BINDING_FIELD_PAYLOAD_FORMAT_INDICATOR_EQUALS,
  source: 'apilint',
  message: "'payloadFormatIndicator' must be one of allowed values",
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintValueOrArray',
  linterParams: [[0, 1]],
  marker: 'value',
  target: 'payloadFormatIndicator',
  data: {},
  conditions: [
    {
      targets: [{ path: 'bindingVersion' }],
      function: 'apilintValueOrArray',
      params: [['0.2.0']],
    },
  ],
};

export default payloadFormatIndicatorEqualsLint;
