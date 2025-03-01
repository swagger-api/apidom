import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../../../../codes.ts';
import { LinterMeta } from '../../../../../../../apidom-language-types.ts';

const qosEqualsLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI2_MQTT_OPERATION_BINDING_FIELD_QOS_EQUALS,
  source: 'apilint',
  message: "'qos' must be one of allowed values",
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintValueOrArray',
  linterParams: [[0, 1, 2]],
  marker: 'value',
  target: 'qos',
  data: {},
  conditions: [
    {
      targets: [{ path: 'bindingVersion' }],
      function: 'apilintValueOrArray',
      params: [['0.1.0']],
    },
  ],
};

export default qosEqualsLint;
