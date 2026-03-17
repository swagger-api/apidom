import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../../../../codes.ts';
import { LinterMeta } from '../../../../../../../apidom-language-types.ts';

const sessionExpiryIntervalTypeLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI2_MQTT5_SERVER_BINDING_FIELD_SESSION_EXPIRY_INTERVAL_TYPE,
  source: 'apilint',
  message: "'sessionExpiryInterval' must be an integer or a Schema Object",
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintElementOrClass',
  linterParams: [['schema', 'number']],
  marker: 'value',
  target: 'sessionExpiryInterval',
  data: {},
  conditions: [
    {
      function: 'missingField',
      params: ['bindingVersion'],
    },
  ],
};

export default sessionExpiryIntervalTypeLint;
