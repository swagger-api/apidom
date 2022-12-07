import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../../../../codes';
import { LinterMeta } from '../../../../../../../apidom-language-types';

const retainTypeLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI2_MQTT_OPERATION_BINDING_FIELD_RETAIN_TYPE,
  source: 'apilint',
  message: "'retain' value must be a boolean",
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintType',
  linterParams: ['boolean'],
  marker: 'value',
  target: 'retain',
  data: {},
  conditions: [
    {
      targets: [{ path: 'bindingVersion' }],
      function: 'apilintValueOrArray',
      params: [['0.1.0']],
    },
  ],
};

export default retainTypeLint;
