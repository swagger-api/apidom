import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../../../../codes.ts';
import { LinterMeta } from '../../../../../../../apidom-language-types.ts';

const messageExpiryIntervalMinimumLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI2_MQTT_OPERATION_BINDING_FIELD_MESSAGE_EXPIRY_INTERVAL_MINIMUM,
  source: 'apilint',
  message: "'messageExpiryInterval' must be a non-negative integer (>=0)",
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintNumber',
  linterParams: [true, true, true],
  marker: 'value',
  target: 'messageExpiryInterval',
  data: {},
  conditions: [
    {
      function: 'missingField',
      params: ['bindingVersion'],
    },
    {
      targets: [{ path: 'messageExpiryInterval' }],
      function: 'apilintElementOrClass',
      params: [['number']],
    },
  ],
};

export default messageExpiryIntervalMinimumLint;
