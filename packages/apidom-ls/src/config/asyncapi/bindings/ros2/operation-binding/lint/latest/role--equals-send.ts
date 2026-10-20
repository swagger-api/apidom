import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../../../../codes.ts';
import { LinterMeta } from '../../../../../../../apidom-language-types.ts';

// reports only roles of the opposite action; unknown roles are reported by role--equals
const roleEqualsSendLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI3_ROS2_OPERATION_BINDING_FIELD_ROLE_EQUALS_SEND,
  source: 'apilint',
  message:
    "'role' must be one of publisher, action_client or service_client when the operation action is 'send'",
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintValueOrArray',
  linterParams: [['publisher', 'action_client', 'service_client']],
  marker: 'value',
  target: 'role',
  data: {},
  conditions: [
    {
      function: 'missingField',
      params: ['bindingVersion'],
    },
    {
      targets: [{ path: 'parent.parent.action' }],
      function: 'apilintValueOrArray',
      params: [['send']],
    },
    {
      targets: [{ path: 'role' }],
      function: 'apilintValueOrArray',
      params: [['subscriber', 'action_server', 'service_server']],
    },
  ],
};

export default roleEqualsSendLint;
