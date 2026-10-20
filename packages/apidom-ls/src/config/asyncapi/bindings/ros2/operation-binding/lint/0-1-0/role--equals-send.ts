import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../../../../codes.ts';
import { LinterMeta } from '../../../../../../../apidom-language-types.ts';

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
      targets: [{ path: 'bindingVersion' }],
      function: 'apilintValueOrArray',
      params: [['0.1.0']],
    },
    {
      targets: [{ path: 'parent.parent.action' }],
      function: 'apilintValueOrArray',
      params: [['send']],
    },
  ],
};

export default roleEqualsSendLint;
