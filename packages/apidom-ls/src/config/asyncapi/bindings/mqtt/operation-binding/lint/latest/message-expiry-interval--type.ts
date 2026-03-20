import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../../../../codes.ts';
import { LinterMeta } from '../../../../../../../apidom-language-types.ts';

const messageExpiryIntervalTypeLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI2_MQTT_OPERATION_BINDING_FIELD_MESSAGE_EXPIRY_INTERVAL_TYPE,
  source: 'apilint',
  message: "'messageExpiryInterval' must be an integer or a Schema Object",
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintElementOrClass',
  linterParams: [['schema', 'number']],
  marker: 'value',
  target: 'messageExpiryInterval',
  data: {},
  conditions: [
    {
      function: 'missingField',
      params: ['bindingVersion'],
    },
  ],
};

export default messageExpiryIntervalTypeLint;
