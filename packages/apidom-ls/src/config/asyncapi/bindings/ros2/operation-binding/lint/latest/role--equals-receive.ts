import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../../../../codes.ts';
import { LinterMeta } from '../../../../../../../apidom-language-types.ts';

// reports only roles of the opposite action; unknown roles are reported by role--equals
const roleEqualsReceiveLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI3_ROS2_OPERATION_BINDING_FIELD_ROLE_EQUALS_RECEIVE,
  source: 'apilint',
  message:
    "'role' must be one of subscriber, action_server or service_server when the operation action is 'receive'",
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintValueOrArray',
  linterParams: [['subscriber', 'action_server', 'service_server']],
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
      params: [['receive']],
    },
    {
      targets: [{ path: 'role' }],
      function: 'apilintValueOrArray',
      params: [['publisher', 'action_client', 'service_client']],
    },
  ],
};

export default roleEqualsReceiveLint;
