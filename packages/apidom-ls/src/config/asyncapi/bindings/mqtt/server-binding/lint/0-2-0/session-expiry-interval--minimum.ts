import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../../../../codes.ts';
import { LinterMeta } from '../../../../../../../apidom-language-types.ts';

const sessionExpiryIntervalMinimumLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI2_MQTT_SERVER_BINDING_FIELD_SESSION_EXPIRY_INTERVAL_MINIMUM,
  source: 'apilint',
  message: "'sessionExpiryInterval' must be a non-negative integer (>=0)",
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintNumber',
  linterParams: [true, true, true],
  marker: 'value',
  target: 'sessionExpiryInterval',
  data: {},
  conditions: [
    {
      targets: [{ path: 'bindingVersion' }],
      function: 'apilintValueOrArray',
      params: [['0.2.0']],
    },
    {
      targets: [{ path: 'sessionExpiryInterval' }],
      function: 'apilintElementOrClass',
      params: [['number']],
    },
  ],
};

export default sessionExpiryIntervalMinimumLint;
