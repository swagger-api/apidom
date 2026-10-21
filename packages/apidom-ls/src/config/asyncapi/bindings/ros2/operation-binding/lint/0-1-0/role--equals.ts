import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../../../../codes.ts';
import { LinterMeta } from '../../../../../../../apidom-language-types.ts';

const roleEqualsLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI3_ROS2_OPERATION_BINDING_FIELD_ROLE_EQUALS,
  source: 'apilint',
  message:
    "'role' must be one of allowed values: publisher, action_client, service_client, subscriber, action_server, service_server",
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintValueOrArray',
  linterParams: [
    [
      'publisher',
      'action_client',
      'service_client',
      'subscriber',
      'action_server',
      'service_server',
    ],
  ],
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
      targets: [{ path: 'parent.parent' }],
      function: 'apilintKeysContainsValue',
      params: [['action'], 'send'],
    },
    {
      targets: [{ path: 'parent.parent' }],
      function: 'apilintKeysContainsValue',
      params: [['action'], 'receive'],
    },
  ],
};

export default roleEqualsLint;
